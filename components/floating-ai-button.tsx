"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AIAssistant } from "./ai-assistant"

export function FloatingAIButton() {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setIsAssistantOpen(true)
      setIsAnimating(false)
    }, 1000)
  }

  return (
    <>
      {/* Stickman AI Assistant */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 left-6 z-40"
      >
        <div className="relative">
          {/* Stickman Character */}
          <motion.div
            animate={
              isAnimating
                ? {
                    y: [0, -20, -40, -20, 0],
                    rotate: [0, 10, -10, 5, 0],
                    scale: [1, 1.1, 0.9, 1.05, 1],
                  }
                : {
                    y: [0, -5, 0],
                    rotate: [0, 2, -2, 0],
                  }
            }
            transition={
              isAnimating
                ? {
                    duration: 1,
                    ease: "easeInOut",
                  }
                : {
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }
            }
            className="cursor-pointer"
            onClick={handleClick}
          >
            <svg width="80" height="100" viewBox="0 0 80 100" className="drop-shadow-lg">
              {/* Background circle */}
              <circle
                cx="40"
                cy="50"
                r="35"
                fill="rgba(59, 130, 246, 0.1)"
                stroke="rgba(59, 130, 246, 0.3)"
                strokeWidth="2"
                className="animate-pulse"
              />

              {/* Stickman Head */}
              <circle cx="40" cy="25" r="8" fill="#fbbf24" stroke="#92400e" strokeWidth="2" />

              {/* Happy Face */}
              <circle cx="37" cy="23" r="1.5" fill="#92400e" />
              <circle cx="43" cy="23" r="1.5" fill="#92400e" />
              <path d="M 35 27 Q 40 30 45 27" stroke="#92400e" strokeWidth="1.5" fill="none" strokeLinecap="round" />

              {/* Body */}
              <line x1="40" y1="33" x2="40" y2="60" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />

              {/* Arms */}
              <motion.line
                x1="40"
                y1="45"
                x2="30"
                y2="50"
                stroke="#92400e"
                strokeWidth="3"
                strokeLinecap="round"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                style={{ transformOrigin: "40px 45px" }}
              />
              <motion.line
                x1="40"
                y1="45"
                x2="50"
                y2="50"
                stroke="#92400e"
                strokeWidth="3"
                strokeLinecap="round"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                style={{ transformOrigin: "40px 45px" }}
              />

              {/* Legs */}
              <motion.line
                x1="40"
                y1="60"
                x2="32"
                y2="75"
                stroke="#92400e"
                strokeWidth="3"
                strokeLinecap="round"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                style={{ transformOrigin: "40px 60px" }}
              />
              <motion.line
                x1="40"
                y1="60"
                x2="48"
                y2="75"
                stroke="#92400e"
                strokeWidth="3"
                strokeLinecap="round"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                style={{ transformOrigin: "40px 60px" }}
              />

              {/* Chat bubble */}
              <motion.g animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                <ellipse cx="65" cy="20" rx="12" ry="8" fill="white" stroke="#3b82f6" strokeWidth="2" />
                <text x="65" y="24" textAnchor="middle" fontSize="8" fill="#3b82f6" fontWeight="bold">
                  AI
                </text>
                <path d="M 55 25 L 50 30 L 55 28 Z" fill="white" stroke="#3b82f6" strokeWidth="1" />
              </motion.g>
            </svg>
          </motion.div>

          {/* Floating particles effect */}
          <AnimatePresence>
            {isAnimating && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, x: 40, y: 50 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: 40 + (Math.random() - 0.5) * 100,
                      y: 50 + (Math.random() - 0.5) * 100,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 1,
                      delay: i * 0.1,
                      ease: "easeOut",
                    }}
                    className="absolute w-2 h-2 bg-blue-400 rounded-full"
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Help text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3 }}
            className="absolute -top-12 left-0 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap shadow-lg"
          >
            Click me for legal help! 💡
            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-600"></div>
          </motion.div>
        </div>
      </motion.div>

      {/* AI Assistant Dialog */}
      <AIAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
    </>
  )
}
