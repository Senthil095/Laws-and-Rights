"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import Link from "next/link"

export function FloatingFeedbackButton() {
  return (
    <motion.div
      className="fixed bottom-6 left-6 z-40"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.2 }}
    >
      <Link href="/feedback">
        <Button className="w-14 h-14 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300">
          <MessageSquare className="h-6 w-6" />
        </Button>
      </Link>
    </motion.div>
  )
}
