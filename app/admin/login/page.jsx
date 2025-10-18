"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Lock, User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { verifyAdminCredentials, setAdminSession } from "@/lib/admin-auth"
import { useToast } from "@/hooks/use-toast"

export default function AdminLoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    id: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Verify credentials
    if (verifyAdminCredentials(formData.id, formData.password)) {
      // Set admin session
      setAdminSession()
      
      toast({
        title: "Login Successful!",
        description: "Welcome to the admin panel."
      })
      
      // Redirect to admin dashboard
      setTimeout(() => {
        router.push('/admin/feedback')
      }, 500)
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid admin ID or password.",
        variant: "destructive"
      })
      setIsLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-6 text-center">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card className="border-2 border-purple-500/20 shadow-2xl bg-white/95 backdrop-blur">
          <CardHeader className="text-center pb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Shield className="h-10 w-10 text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Admin Login
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Enter your credentials to access the admin panel
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="id" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-purple-600" />
                  Admin ID
                </Label>
                <Input
                  id="id"
                  name="id"
                  type="text"
                  value={formData.id}
                  onChange={handleInputChange}
                  placeholder="Enter admin ID"
                  required
                  className="border-purple-200 focus:border-purple-500"
                  autoComplete="off"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-purple-600" />
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  required
                  className="border-purple-200 focus:border-purple-500"
                  autoComplete="off"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 text-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Logging in...
                  </div>
                ) : (
                  <>
                    <Shield className="h-5 w-5 mr-2" />
                    Login to Admin Panel
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center"
        >
          <p className="text-sm text-white/70">
            Protected Admin Area • Unauthorized access is prohibited
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
