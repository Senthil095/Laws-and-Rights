"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles, Trophy, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStreak } from "@/contexts/StreakContext"
import { getRewardDisplayText, getRandomQuote, getRandomFact, hasSpecialAnimation } from "@/lib/streak-rewards"
import Confetti from "react-confetti"
import { useState, useEffect } from "react"

export function RewardModal() {
  const { showRewardModal, newReward, closeRewardModal } = useStreak()
  const [showConfetti, setShowConfetti] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (showRewardModal && newReward) {
      const isSpecial = hasSpecialAnimation(newReward.day)
      setShowConfetti(isSpecial)
      
      // Update window dimensions for confetti
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
  }, [showRewardModal, newReward])

  if (!showRewardModal || !newReward) return null

  const { reward, day } = newReward
  const rewardText = getRewardDisplayText(reward)
  const isSpecial = hasSpecialAnimation(day)

  return (
    <AnimatePresence>
      {showConfetti && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={closeRewardModal}
      >
        <motion.div
          initial={{ scale: 0.8, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: 50, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Gradient */}
          <div className={`relative p-8 ${isSpecial ? 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500' : 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={closeRewardModal}
            >
              <X className="h-5 w-5" />
            </Button>

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex justify-center mb-4"
            >
              {isSpecial ? (
                <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                  <Trophy className="h-16 w-16 text-white" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                  <Flame className="h-12 w-12 text-white" />
                </div>
              )}
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-white text-center mb-2"
            >
              {isSpecial ? "🎉 Milestone Achieved!" : "Daily Reward!"}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/90 text-center font-medium"
            >
              Day {day} Streak
            </motion.p>
          </div>

          {/* Reward Content */}
          <div className="p-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-purple-500" />
                <h3 className="text-xl font-bold text-gray-800">You Earned</h3>
                <Sparkles className="h-5 w-5 text-purple-500" />
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                  {rewardText}
                </p>
                <p className="text-sm text-gray-600">{reward.description}</p>
              </div>
            </motion.div>

            {/* Show quote if reward includes one */}
            {reward.quote && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg"
              >
                <p className="text-sm italic text-gray-700">{getRandomQuote()}</p>
              </motion.div>
            )}

            {/* Show fact if reward includes one */}
            {reward.fact && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg"
              >
                <p className="text-xs font-semibold text-blue-700 mb-1">💡 Legal Fact</p>
                <p className="text-sm text-gray-700">{getRandomFact()}</p>
              </motion.div>
            )}

            {/* Continue Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                onClick={closeRewardModal}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 text-lg rounded-xl"
              >
                Continue Learning! 🚀
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
