"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"
import { StickmanDrama } from "@/components/stickman-drama"

export function ScenarioAnimation({ scenario = "", scenarioType, onComplete }) {
  const [currentText, setCurrentText] = useState("")
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showDrama, setShowDrama] = useState(false)
  const [dramaComplete, setDramaComplete] = useState(false)

  // Safety check for scenario
  const safeScenario = scenario || "Loading scenario..."

  useEffect(() => {
    if (!isPlaying) return

    if (currentIndex < safeScenario.length) {
      const timer = setTimeout(() => {
        setCurrentText(safeScenario.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 50) // Typing speed

      return () => clearTimeout(timer)
    } else {
      // Show drama when text is complete
      setShowDrama(true)
    }
  }, [currentIndex, isPlaying, safeScenario])

  const handleDramaComplete = () => {
    setDramaComplete(true)
    setTimeout(() => {
      onComplete()
    }, 2000)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const skipAnimation = () => {
    setCurrentText(safeScenario)
    setCurrentIndex(safeScenario.length)
    setShowDrama(true)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2 border-purple-200 dark:border-purple-800">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl font-bold text-purple-800 dark:text-purple-300 mb-4"
            >
              🎭 Legal Scenario Drama
            </motion.h2>
          </div>

          {/* Large Drama Section */}
          <div className="mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg min-h-[400px] flex items-center justify-center">
              {showDrama ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <StickmanDrama scenarioType={scenarioType} outcome="setup" onComplete={handleDramaComplete} />
                  {!dramaComplete && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-center mt-4 text-lg text-gray-600 dark:text-gray-400 font-medium"
                    >
                      🎬 Watch carefully and analyze the situation...
                    </motion.p>
                  )}
                </motion.div>
              ) : (
                <div className="text-center text-gray-400 dark:text-gray-600">
                  <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-6"></div>
                  <p className="text-lg">Preparing drama scene...</p>
                </div>
              )}
            </div>
          </div>

          {/* Text Section Below */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-6 shadow-lg min-h-[120px] flex items-center justify-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-4xl"
            >
              {currentText}
              {currentIndex < safeScenario.length && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                  className="inline-block w-0.5 h-7 bg-purple-600 ml-1"
                />
              )}
            </motion.p>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <Button
              variant="outline"
              onClick={togglePlayPause}
              className="flex items-center gap-2 bg-transparent text-lg px-6 py-3"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              {isPlaying ? "Pause" : "Resume"}
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: showDrama && dramaComplete ? "100%" : `${(currentIndex / safeScenario.length) * 80}%`,
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="text-base text-gray-500 dark:text-gray-400 text-center mt-3 font-medium">
              {showDrama && dramaComplete
                ? "Ready to answer..."
                : showDrama
                  ? "Watching scenario..."
                  : `Reading scenario... ${Math.round((currentIndex / safeScenario.length) * 100)}%`}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
