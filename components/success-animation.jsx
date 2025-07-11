"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, RotateCcw, Trophy, BookOpen } from "lucide-react"
import { StickmanDrama } from "@/components/stickman-drama"

export function SuccessAnimation({
  explanation,
  score,
  scenarioType,
  selectedOption,
  onRestart,
  onNextLevel,
  hasNextLevel,
}) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto">
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
        <CardHeader className="text-center pb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto mb-4"
          >
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
          </motion.div>
          <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-400 flex items-center justify-center gap-2">
            <Trophy className="h-6 w-6" />
            Excellent! Correct Answer
          </CardTitle>
          <Badge
            variant="secondary"
            className="mx-auto bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
          >
            Score: {score}/100
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Stickman Drama - Shows positive outcome */}
          <div className="flex justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <StickmanDrama scenarioType={scenarioType} outcome="correct" selectedOption={selectedOption} />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-center mt-4 text-sm text-green-600 dark:text-green-400"
              >
                🎉 Great choice! See the positive outcome...
              </motion.p>
            </motion.div>
          </div>

          {/* Explanation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3 }}
            className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
          >
            <h3 className="font-semibold text-blue-800 dark:text-blue-400 mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Legal Explanation:
            </h3>
            <p className="text-blue-700 dark:text-blue-300">{explanation}</p>
          </motion.div>

          {/* Congratulations Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2 }}
            className="bg-green-100 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800 text-center"
          >
            <h3 className="font-semibold text-green-800 dark:text-green-400 mb-2">🎊 Congratulations!</h3>
            <p className="text-green-700 dark:text-green-300">
              You demonstrated excellent knowledge of your legal rights. This understanding empowers you to protect
              yourself and seek justice when needed.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            {hasNextLevel ? (
              <Button
                onClick={onNextLevel}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold"
              >
                <ArrowRight className="h-5 w-5 mr-2" />
                Next Level
              </Button>
            ) : (
              <Button
                onClick={() => (window.location.href = "/")}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold"
              >
                <Trophy className="h-5 w-5 mr-2" />
                Complete Category
              </Button>
            )}

            <Button
              onClick={onRestart}
              variant="outline"
              className="px-8 py-3 rounded-xl font-semibold border-2 border-green-200 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-950/20 bg-transparent"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Try Again
            </Button>
          </motion.div>

          {/* Learning Achievement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.6 }}
            className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 text-center"
          >
            <p className="text-yellow-800 dark:text-yellow-300 text-sm">
              🏆 <strong>Achievement Unlocked:</strong> Legal Rights Champion! You're building valuable knowledge that
              will serve you throughout life.
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
