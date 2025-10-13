"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Award, Home, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getTotalPoints, getAllProgress, getEarnedBadges } from "@/lib/progress"
import { CATEGORY_BADGES, getCategoryPoints } from "@/lib/rewards"
import { gameData } from "@/lib/game-data"

export default function AchievementsPage() {
  const [totalPoints, setTotalPoints] = useState(0)
  const [earnedBadgeIds, setEarnedBadgeIds] = useState([])
  const [categoryProgress, setCategoryProgress] = useState({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    loadProgress()
  }, [])

  const loadProgress = () => {
    const points = getTotalPoints()
    const badges = getEarnedBadges()
    const progress = getAllProgress()
    
    setTotalPoints(points)
    setEarnedBadgeIds(badges)
    setCategoryProgress(progress)
  }

  if (!mounted) {
    return <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50" />
  }

  const earnedBadges = earnedBadgeIds.map((badgeId) => CATEGORY_BADGES[badgeId]).filter(Boolean)
  const allBadges = Object.values(CATEGORY_BADGES)

  // Calculate category stats
  const categoryStats = Object.keys(gameData).map((categoryId) => {
    const categoryData = gameData[categoryId]
    const totalLevels = Object.keys(categoryData.levels || {}).length
    const completedLevels = categoryProgress[categoryId] ? Object.keys(categoryProgress[categoryId]).length : 0
    const progress = totalLevels > 0 ? Math.round((completedLevels / totalLevels) * 100) : 0
    const points = getCategoryPoints(categoryId, categoryProgress)
    const badge = CATEGORY_BADGES[categoryId]
    const hasBadge = earnedBadgeIds.includes(categoryId)

    return {
      id: categoryId,
      title: categoryData.title,
      totalLevels,
      completedLevels,
      progress,
      points,
      badge,
      hasBadge,
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Your Achievements
              </h1>
              <p className="text-gray-600 mt-2">Track your progress and earned rewards</p>
            </div>
            
            <Card className="shadow-lg border-2 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Points</p>
                    <p className="text-3xl font-bold text-purple-600">{totalPoints}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-purple-600" />
                    Category Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categoryStats.map((category, index) => (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{category.badge?.icon || "📚"}</span>
                          <div>
                            <h3 className="font-semibold text-gray-800">{category.title}</h3>
                            <p className="text-sm text-gray-600">
                              {category.completedLevels} / {category.totalLevels} levels completed
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-purple-600">{category.points} pts</p>
                          {category.hasBadge && (
                            <Badge className="mt-1 bg-gradient-to-r from-purple-600 to-pink-600">
                              <Award className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Progress value={category.progress} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">{category.progress}% complete</p>
                    </motion.div>
                  ))}
                  
                  {categoryStats.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Trophy className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No progress yet. Start playing to earn points!</p>
                      <Link href="/">
                        <Button className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600">
                          Start Learning
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar - Badges */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    Badges ({earnedBadges.length}/{allBadges.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {allBadges.map((badge, index) => {
                    const isEarned = earnedBadgeIds.includes(badge.id)
                    return (
                      <motion.div
                        key={badge.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                        className={`p-4 rounded-lg border-2 ${
                          isEarned
                            ? "bg-gradient-to-r " + badge.color + " border-transparent text-white"
                            : "bg-gray-100 border-gray-300 opacity-50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-3xl">{badge.icon}</span>
                          <div className="flex-1">
                            <h4 className={`font-semibold ${isEarned ? "text-white" : "text-gray-700"}`}>
                              {badge.name}
                            </h4>
                            <p className={`text-sm ${isEarned ? "text-white/90" : "text-gray-600"}`}>
                              {badge.description}
                            </p>
                            {isEarned && (
                              <Badge className="mt-2 bg-white/20 text-white border-white/30">
                                ✓ Unlocked
                              </Badge>
                            )}
                            {!isEarned && (
                              <Badge variant="outline" className="mt-2">
                                🔒 Locked
                              </Badge>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="shadow-lg bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/90">Total Badges</span>
                    <span className="text-2xl font-bold">{earnedBadges.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/90">Categories Completed</span>
                    <span className="text-2xl font-bold">{earnedBadges.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/90">Total Points</span>
                    <span className="text-2xl font-bold">{totalPoints}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-white/20">
                    <span className="text-white/90">Completion Rate</span>
                    <span className="text-2xl font-bold">
                      {Math.round((earnedBadges.length / allBadges.length) * 100)}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
