"use client"

import { motion } from "framer-motion"

export function StickmanAnimation({ type = "neutral" }) {
  const getAnimationProps = () => {
    switch (type) {
      case "happy":
        return {
          bodyColor: "#10b981", // green
          animate: {
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          },
          transition: {
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }
      case "sad":
        return {
          bodyColor: "#ef4444", // red
          animate: {
            y: [0, 5, 0],
            rotate: [0, -2, 2, 0],
          },
          transition: {
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }
      case "thinking":
        return {
          bodyColor: "#f59e0b", // amber
          animate: {
            rotate: [0, -5, 5, 0],
          },
          transition: {
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }
      case "confused":
        return {
          bodyColor: "#8b5cf6", // purple
          animate: {
            x: [0, -5, 5, 0],
            rotate: [0, -10, 10, 0],
          },
          transition: {
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }
      case "angry":
        return {
          bodyColor: "#dc2626", // red-600
          animate: {
            x: [0, -3, 3, 0],
            y: [0, -3, 0],
          },
          transition: {
            duration: 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }
      default:
        return {
          bodyColor: "#6b7280", // gray
          animate: {
            y: [0, -5, 0],
          },
          transition: {
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }
    }
  }

  const { bodyColor, animate, transition } = getAnimationProps()

  const getFaceElements = () => {
    switch (type) {
      case "happy":
        return (
          <>
            {/* Happy eyes */}
            <motion.circle
              cx="52"
              cy="20"
              r="2"
              fill={bodyColor}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
            <motion.circle
              cx="68"
              cy="20"
              r="2"
              fill={bodyColor}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
            {/* Happy mouth */}
            <motion.path
              d="M 50 30 Q 60 35 70 30"
              stroke={bodyColor}
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            />
          </>
        )

      case "sad":
        return (
          <>
            {/* Sad eyes */}
            <motion.line
              x1="50"
              y1="18"
              x2="54"
              y2="22"
              stroke={bodyColor}
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5 }}
            />
            <motion.line
              x1="54"
              y1="18"
              x2="50"
              y2="22"
              stroke={bodyColor}
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5 }}
            />
            <motion.line
              x1="66"
              y1="18"
              x2="70"
              y2="22"
              stroke={bodyColor}
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5 }}
            />
            <motion.line
              x1="70"
              y1="18"
              x2="66"
              y2="22"
              stroke={bodyColor}
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5 }}
            />
            {/* Sad mouth */}
            <motion.path
              d="M 50 32 Q 60 27 70 32"
              stroke={bodyColor}
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            />
            {/* Tear */}
            <motion.circle
              cx="48"
              cy="25"
              r="1"
              fill={bodyColor}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: [0, 10, 20] }}
              transition={{ delay: 1, duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </>
        )

      case "thinking":
        return (
          <>
            {/* Thinking eyes */}
            <motion.circle
              cx="52"
              cy="20"
              r="2"
              fill={bodyColor}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
            <motion.circle
              cx="68"
              cy="20"
              r="2"
              fill={bodyColor}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
            {/* Thinking mouth */}
            <motion.circle
              cx="60"
              cy="30"
              r="2"
              stroke={bodyColor}
              strokeWidth="2"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            />
            {/* Thought bubble */}
            <motion.circle
              cx="80"
              cy="10"
              r="3"
              stroke={bodyColor}
              strokeWidth="1"
              fill="none"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 1.2] }}
              transition={{ delay: 1, duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.circle
              cx="85"
              cy="5"
              r="1"
              fill={bodyColor}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 1.2, duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </>
        )

      case "confused":
        return (
          <>
            {/* Confused eyes */}
            <motion.circle
              cx="52"
              cy="20"
              r="2"
              fill={bodyColor}
              initial={{ opacity: 0 }}
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ delay: 0.5, duration: 1, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.circle
              cx="68"
              cy="20"
              r="2"
              fill={bodyColor}
              initial={{ opacity: 0 }}
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ delay: 0.7, duration: 1, repeat: Number.POSITIVE_INFINITY }}
            />
            {/* Confused mouth */}
            <motion.path
              d="M 55 30 Q 60 32 65 30"
              stroke={bodyColor}
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            />
            {/* Question mark */}
            <motion.text
              x="75"
              y="15"
              fontSize="12"
              fill={bodyColor}
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: [0, 1, 0], rotate: [0, 10, -10, 0] }}
              transition={{ delay: 1, duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              ?
            </motion.text>
          </>
        )

      case "angry":
        return (
          <>
            {/* Angry eyes */}
            <motion.line
              x1="48"
              y1="18"
              x2="56"
              y2="22"
              stroke={bodyColor}
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5 }}
            />
            <motion.line
              x1="56"
              y1="18"
              x2="48"
              y2="22"
              stroke={bodyColor}
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5 }}
            />
            <motion.line
              x1="64"
              y1="18"
              x2="72"
              y2="22"
              stroke={bodyColor}
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5 }}
            />
            <motion.line
              x1="72"
              y1="18"
              x2="64"
              y2="22"
              stroke={bodyColor}
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5 }}
            />
            {/* Angry mouth */}
            <motion.path
              d="M 50 32 Q 60 27 70 32"
              stroke={bodyColor}
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            />
          </>
        )

      default:
        return (
          <>
            {/* Neutral eyes */}
            <motion.circle
              cx="52"
              cy="20"
              r="2"
              fill={bodyColor}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
            <motion.circle
              cx="68"
              cy="20"
              r="2"
              fill={bodyColor}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
            {/* Neutral mouth */}
            <motion.line
              x1="55"
              y1="30"
              x2="65"
              y2="30"
              stroke={bodyColor}
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.7 }}
            />
          </>
        )
    }
  }

  return (
    <motion.div animate={animate} transition={transition} className="flex justify-center items-center">
      <svg width="120" height="160" viewBox="0 0 120 160" className="stickman">
        {/* Head */}
        <motion.circle
          cx="60"
          cy="25"
          r="20"
          stroke={bodyColor}
          strokeWidth="3"
          fill="none"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        />

        {/* Face */}
        {getFaceElements()}

        {/* Body */}
        <motion.line
          x1="60"
          y1="45"
          x2="60"
          y2="100"
          stroke={bodyColor}
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />

        {/* Arms */}
        <motion.line
          x1="60"
          y1="60"
          x2="40"
          y2="80"
          stroke={bodyColor}
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
        <motion.line
          x1="60"
          y1="60"
          x2="80"
          y2="80"
          stroke={bodyColor}
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />

        {/* Legs */}
        <motion.line
          x1="60"
          y1="100"
          x2="40"
          y2="140"
          stroke={bodyColor}
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        />
        <motion.line
          x1="60"
          y1="100"
          x2="80"
          y2="140"
          stroke={bodyColor}
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        />
      </svg>
    </motion.div>
  )
}
