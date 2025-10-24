"use client"

import { useMemo, useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Play, ArrowLeft, Trophy, Star, Award } from "lucide-react"
import { gameData } from "@/lib/game-data"
import { CATEGORY_BADGES, getCategoryPoints } from "@/lib/rewards"
import { useProgress } from "@/contexts/ProgressContext"
import { useAuth } from "@/contexts/AuthContext"

const categoryThemes = {
  "fundamental-rights": {
    gradient: "from-blue-500 to-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/20",
    border: "border-blue-200 dark:border-blue-900/50",
  },
  "human-rights": {
    gradient: "from-pink-500 to-pink-600",
    bg: "bg-pink-50 dark:bg-pink-950/20",
    border: "border-pink-200 dark:border-pink-900/50",
  },
  "womens-rights": {
    gradient: "from-rose-500 to-rose-600",
    bg: "bg-rose-50 dark:bg-rose-950/20",
    border: "border-rose-200 dark:border-rose-900/50",
  },
  "criminal-law": {
    gradient: "from-red-500 to-red-600",
    bg: "bg-red-50 dark:bg-red-950/20",
    border: "border-red-200 dark:border-red-900/50",
  },
  "consumer-rights": {
    gradient: "from-green-500 to-green-600",
    bg: "bg-green-50 dark:bg-green-950/20",
    border: "border-green-200 dark:border-green-900/50",
  },
  "traffic-rules": {
    gradient: "from-orange-500 to-orange-600",
    bg: "bg-orange-50 dark:bg-orange-950/20",
    border: "border-orange-200 dark:border-orange-900/50",
  },
  "cyber-security": {
    gradient: "from-purple-500 to-purple-600",
    bg: "bg-purple-50 dark:bg-purple-950/20",
    border: "border-purple-200 dark:border-purple-900/50",
  },
  "child-rights": {
    gradient: "from-indigo-500 to-indigo-600",
    bg: "bg-indigo-50 dark:bg-indigo-950/20",
    border: "border-indigo-200 dark:border-indigo-900/50",
  },
  "family-marriage-laws": {
    gradient: "from-amber-500 to-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/20",
    border: "border-amber-200 dark:border-amber-900/50",
  },
  "educational-rights": {
    gradient: "from-teal-500 to-teal-600",
    bg: "bg-teal-50 dark:bg-teal-950/20",
    border: "border-teal-200 dark:border-teal-900/50",
  },
  "environmental-laws": {
    gradient: "from-green-500 to-emerald-600",
    bg: "bg-green-50 dark:bg-green-950/20",
    border: "border-green-200 dark:border-green-900/50",
  },
}

export default function CategoryLevelsPage() {
  const { category } = useParams()
  const data = gameData[category]
  const { user } = useAuth()
  const { progressData } = useProgress()
  const [mounted, setMounted] = useState(false)

  const levelsArray = useMemo(() => {
    if (!data) return []
    const entries = Object.entries(data.levels)
    return entries
      .map(([num, level]) => ({ num: Number(num), title: level.title || `Level ${num}`, scenarioType: level.scenarioType }))
      .sort((a, b) => a.num - b.num)
  }, [data])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const theme = categoryThemes[category] || categoryThemes["fundamental-rights"]
  
  // Calculate progress and points from ProgressContext
  const progress = progressData?.completedLevels?.[category] || {}
  const completedCount = Object.keys(progress).length
  const totalLevels = levelsArray.length
  const progressPercentage = totalLevels > 0 ? Math.round((completedCount / totalLevels) * 100) : 0
  const categoryPoints = getCategoryPoints(category, { [category]: progress })
  const earnedBadges = progressData?.earnedBadges || []
  const hasBadge = earnedBadges.includes(category)
  const badge = CATEGORY_BADGES[category]
  
  // Check if each level is completed
  const completedLevels = {}
  levelsArray.forEach((lvl) => {
    completedLevels[lvl.num] = Boolean(progress[String(lvl.num)])
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-950">
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </Link>
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{data.title}</h1>
            <p className="text-gray-600 dark:text-gray-300">Choose a level to play or replay</p>
          </div>
          <div className="w-24" />
        </div>

        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 max-w-4xl mx-auto"
        >
          <Card className={`${theme.bg} ${theme.border} border-2 shadow-lg`}>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Progress */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">Progress</h3>
                  </div>
                  <Progress value={progressPercentage} className="h-3 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {completedCount} / {totalLevels} levels completed
                  </p>
                </div>

                {/* Points */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="h-5 w-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">Points Earned</h3>
                  </div>
                  <p className={`text-3xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                    {categoryPoints}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{completedCount * 10} total points</p>
                </div>

                {/* Badge */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">Category Badge</h3>
                  </div>
                  {hasBadge ? (
                    <div className={`flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r ${badge?.color} text-white`}>
                      <span className="text-2xl">{badge?.icon}</span>
                      <div>
                        <p className="text-sm font-semibold">Unlocked!</p>
                        <p className="text-xs opacity-90">{badge?.name}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                      <span className="text-2xl opacity-50">{badge?.icon || "🏆"}</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Locked</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Complete all levels</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {levelsArray.map((lvl, idx) => {
            const done = mounted && completedLevels[lvl.num]
            return (
              <motion.div key={lvl.num} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * idx }}>
                <Link href={`/game/${category}/${lvl.num}`} className="block">
                  <Card className={`relative overflow-hidden ${theme.bg} ${theme.border} border-2 hover:shadow-2xl transition-all` }>
                    <motion.div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-0 hover:opacity-10 transition-opacity`} />
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Level {lvl.num}</div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{lvl.title}</h3>
                        </div>
                        {done ? (
                          <Badge variant="secondary" className="flex items-center gap-1 bg-green-100 text-green-800">
                            <CheckCircle className="h-4 w-4" /> Completed
                          </Badge>
                        ) : (
                          <Badge variant="outline">New</Badge>
                        )}
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-xs text-gray-500 dark:text-gray-400">Replay anytime</div>
                        <Button size="sm" className={`bg-gradient-to-r ${theme.gradient} text-white` }>
                          <Play className="h-4 w-4 mr-1" /> Play
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
