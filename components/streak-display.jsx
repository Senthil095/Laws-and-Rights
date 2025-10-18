"use client"

import { motion } from "framer-motion"
import { Flame, Trophy, Zap } from "lucide-react"
import { useStreak } from "@/contexts/StreakContext"

export function StreakDisplay({ compact = false }) {
  const { streakData, loading } = useStreak()

  if (loading || !streakData) {
    return null
  }

  if (compact) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center gap-3"
      >
        {/* Streak Count */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white">
          <Flame className="h-4 w-4" />
          <span className="text-sm font-bold">{streakData.currentStreak}</span>
        </div>

        {/* Points */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white">
          <Zap className="h-4 w-4" />
          <span className="text-sm font-bold">{streakData.totalPoints || 0}</span>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Your Progress</h3>
        <Trophy className="h-6 w-6 text-yellow-500" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Current Streak */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <Flame className="h-6 w-6 text-white" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">{streakData.currentStreak}</p>
          <p className="text-xs text-gray-600">Day Streak</p>
        </div>

        {/* Total Points */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">{streakData.totalPoints || 0}</p>
          <p className="text-xs text-gray-600">Total Points</p>
        </div>

        {/* Longest Streak */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Trophy className="h-6 w-6 text-white" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">{streakData.longestStreak}</p>
          <p className="text-xs text-gray-600">Best Streak</p>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-sm font-semibold text-purple-600">{streakData.badges?.length || 0}</p>
            <p className="text-xs text-gray-600">Badges</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-purple-600">{streakData.hintTokens || 0}</p>
            <p className="text-xs text-gray-600">Hints</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-purple-600">{streakData.titles?.length || 0}</p>
            <p className="text-xs text-gray-600">Titles</p>
          </div>
        </div>
      </div>

      {/* Current Title Display */}
      {streakData.currentTitle && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-1">Current Title</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
              <span className="text-sm font-bold text-purple-700">⚖️ {streakData.currentTitle}</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
