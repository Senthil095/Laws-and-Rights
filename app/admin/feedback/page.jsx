"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Download, 
  MessageSquare, 
  Bug, 
  Lightbulb, 
  Heart,
  TrendingUp,
  Users,
  Clock,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"
import { 
  getAllFeedback, 
  getFeedbackByCategory,
  getFeedbackStats,
  FEEDBACK_CATEGORIES,
  FEEDBACK_CATEGORY_LABELS,
  prepareFeedbackByCategoryForExcel
} from "@/lib/feedback-service"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { isAdminAuthenticated, clearAdminSession } from "@/lib/admin-auth"
import { useToast } from "@/hooks/use-toast"
import * as XLSX from 'xlsx'

export default function AdminFeedbackPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [feedback, setFeedback] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    // Check admin authentication
    if (!isAdminAuthenticated()) {
      toast({
        title: "Access Denied",
        description: "Please login as admin to access this page.",
        variant: "destructive"
      })
      router.push('/admin/login')
      return
    }
    
    loadFeedback()
  }, [router, toast])

  const loadFeedback = async () => {
    setLoading(true)
    try {
      const [allFeedback, feedbackStats] = await Promise.all([
        getAllFeedback(),
        getFeedbackStats()
      ])
      
      setFeedback(allFeedback)
      setStats(feedbackStats)
    } catch (error) {
      console.error("Error loading feedback:", error)
    } finally {
      setLoading(false)
    }
  }

  const exportToExcel = () => {
    if (feedback.length === 0) {
      alert('No feedback to export!')
      return
    }

    // Prepare data categorized by type
    const categorizedData = prepareFeedbackByCategoryForExcel(feedback)
    
    // Create workbook
    const wb = XLSX.utils.book_new()
    
    // Add a sheet for each category
    Object.entries(categorizedData).forEach(([categoryName, data]) => {
      if (data.length > 0) {
        const ws = XLSX.utils.json_to_sheet(data)
        
        // Set column widths
        ws['!cols'] = [
          { width: 20 }, // Date
          { width: 20 }, // User
          { width: 25 }, // Email
          { width: 30 }, // Subject
          { width: 50 }, // Message
          { width: 12 }, // Status
          { width: 10 }  // Rating
        ]
        
        XLSX.utils.book_append_sheet(wb, ws, categoryName)
      }
    })
    
    // Add summary sheet
    const summary = [
      { 'Category': 'General Feedback', 'Count': stats.byCategory[FEEDBACK_CATEGORIES.GENERAL] },
      { 'Category': 'Bug Reports', 'Count': stats.byCategory[FEEDBACK_CATEGORIES.BUG_REPORT] },
      { 'Category': 'Feature Requests', 'Count': stats.byCategory[FEEDBACK_CATEGORIES.FEATURE_REQUEST] },
      { 'Category': 'Appreciation', 'Count': stats.byCategory[FEEDBACK_CATEGORIES.APPRECIATION] },
      { 'Category': '', 'Count': '' },
      { 'Category': 'Total Feedback', 'Count': stats.total },
      { 'Category': '', 'Count': '' },
      { 'Category': 'Pending', 'Count': stats.byStatus.pending },
      { 'Category': 'Reviewed', 'Count': stats.byStatus.reviewed },
      { 'Category': 'Resolved', 'Count': stats.byStatus.resolved }
    ]
    
    const summarySheet = XLSX.utils.json_to_sheet(summary)
    summarySheet['!cols'] = [{ width: 25 }, { width: 15 }]
    XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary')
    
    // Generate filename with date
    const date = new Date().toISOString().split('T')[0]
    const filename = `Feedback_Report_${date}.xlsx`
    
    // Save file
    XLSX.writeFile(wb, filename)
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case FEEDBACK_CATEGORIES.BUG_REPORT:
        return <Bug className="h-4 w-4" />
      case FEEDBACK_CATEGORIES.FEATURE_REQUEST:
        return <Lightbulb className="h-4 w-4" />
      case FEEDBACK_CATEGORIES.APPRECIATION:
        return <Heart className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case FEEDBACK_CATEGORIES.BUG_REPORT:
        return 'bg-red-100 text-red-700 border-red-200'
      case FEEDBACK_CATEGORIES.FEATURE_REQUEST:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case FEEDBACK_CATEGORIES.APPRECIATION:
        return 'bg-pink-100 text-pink-700 border-pink-200'
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200'
    }
  }

  const filteredFeedback = selectedCategory === 'all' 
    ? feedback 
    : feedback.filter(f => f.category === selectedCategory)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading feedback...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Feedback Dashboard
              </h1>
              <p className="text-gray-600">Manage and export user feedback</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              onClick={exportToExcel}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export to Excel
            </Button>
            
            <Button 
              onClick={() => {
                clearAdminSession()
                toast({
                  title: "Logged Out",
                  description: "You have been logged out successfully."
                })
                router.push('/admin/login')
              }}
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-2 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Feedback</p>
                    <p className="text-3xl font-bold text-purple-600">{stats.total}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Bug Reports</p>
                    <p className="text-3xl font-bold text-red-600">
                      {stats.byCategory[FEEDBACK_CATEGORIES.BUG_REPORT]}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Bug className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Feature Requests</p>
                    <p className="text-3xl font-bold text-yellow-600">
                      {stats.byCategory[FEEDBACK_CATEGORIES.FEATURE_REQUEST]}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Lightbulb className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Appreciation</p>
                    <p className="text-3xl font-bold text-pink-600">
                      {stats.byCategory[FEEDBACK_CATEGORIES.APPRECIATION]}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-pink-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Feedback List */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>All Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Category Filter */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value={FEEDBACK_CATEGORIES.GENERAL}>General</TabsTrigger>
                <TabsTrigger value={FEEDBACK_CATEGORIES.BUG_REPORT}>Bugs</TabsTrigger>
                <TabsTrigger value={FEEDBACK_CATEGORIES.FEATURE_REQUEST}>Features</TabsTrigger>
                <TabsTrigger value={FEEDBACK_CATEGORIES.APPRECIATION}>Thanks</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Feedback Items */}
            <div className="space-y-4">
              {filteredFeedback.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No feedback found in this category.</p>
              ) : (
                filteredFeedback.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={`${getCategoryColor(item.category)} border`}>
                                {getCategoryIcon(item.category)}
                                <span className="ml-1">{FEEDBACK_CATEGORY_LABELS[item.category]}</span>
                              </Badge>
                              {item.rating && (
                                <Badge variant="secondary">
                                  ⭐ {item.rating}/5
                                </Badge>
                              )}
                              <span className="text-sm text-gray-500 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(item.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            
                            <h3 className="font-semibold text-lg mb-1">{item.subject}</h3>
                            <p className="text-gray-700 mb-2">{item.message}</p>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {item.userName}
                              </span>
                              {item.userEmail && (
                                <span>{item.userEmail}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
