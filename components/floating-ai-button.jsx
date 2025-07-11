"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Bot } from "lucide-react"
import { AIAssistant } from "@/components/ai-assistant"

export function FloatingAIButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </motion.div>

      <AnimatePresence>
        <AIAssistant isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </AnimatePresence>
    </>
  )
}
