"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, RotateCcw, BookOpen, X } from "lucide-react"
import { StickmanDrama } from "@/components/stickman-drama"

export function PunishmentAnimation({
  punishment,
  correctAnswer,
  explanation,
  scenarioType,
  selectedOption,
  onRestart,
}) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto">
      <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
        <CardHeader className="text-center pb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto mb-4"
          >
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
          </motion.div>
          <CardTitle className="text-2xl font-bold text-red-800 dark:text-red-400 flex items-center justify-center gap-2">
            <X className="h-6 w-6" />
            Incorrect Answer
          </CardTitle>
          <Badge variant="destructive" className="mx-auto">
            Score: 0/100
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Stickman Drama - Shows consequences */}
          <div className="flex justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <StickmanDrama scenarioType={scenarioType} outcome="wrong" selectedOption={selectedOption} />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-center mt-4 text-sm text-red-600 dark:text-red-400"
              >
                😔 Watch the consequences of your choice...
              </motion.p>
            </motion.div>
          </div>

          {/* Punishment Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3 }}
            className="bg-red-100 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800"
          >
            <h3 className="font-semibold text-red-800 dark:text-red-400 mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Consequence of Not Knowing Your Rights:
            </h3>
            <p className="text-red-700 dark:text-red-300">{punishment}</p>
          </motion.div>

          {/* Correct Answer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2 }}
            className="bg-green-100 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800"
          >
            <h3 className="font-semibold text-green-800 dark:text-green-400 mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              The Correct Answer Was:
            </h3>
            <p className="text-green-700 dark:text-green-300 font-medium">{correctAnswer}</p>
          </motion.div>

          {/* Explanation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.4 }}
            className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
          >
            <h3 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">Legal Explanation:</h3>
            <p className="text-blue-700 dark:text-blue-300">{explanation}</p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.6 }}
            className="flex justify-center pt-4"
          >
            <Button
              onClick={onRestart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Try Again
            </Button>
          </motion.div>

          {/* Learning Tip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.8 }}
            className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 text-center"
          >
            <p className="text-yellow-800 dark:text-yellow-300 text-sm">
              💡 <strong>Remember:</strong> Knowing your legal rights empowers you to protect yourself and seek justice
              when needed.
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
