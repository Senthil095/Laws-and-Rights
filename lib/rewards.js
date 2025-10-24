// Rewards and Points System

export const POINTS_PER_LEVEL = 10

export const CATEGORY_BADGES = {
  "fundamental-rights": {
    id: "fundamental-rights",
    name: "Constitutional Guardian",
    description: "Mastered all Fundamental Rights of India",
    icon: "🛡️",
    color: "from-blue-500 to-blue-600",
  },
  "consumer-rights": {
    id: "consumer-rights",
    name: "Consumer Champion",
    description: "Protected consumer rights across all scenarios",
    icon: "🛒",
    color: "from-green-500 to-green-600",
  },
  "traffic-laws": {
    id: "traffic-laws",
    name: "Road Safety Expert",
    description: "Completed all traffic law challenges",
    icon: "🚦",
    color: "from-orange-500 to-orange-600",
  },
  "cyber-laws": {
    id: "cyber-laws",
    name: "Cyber Security Sentinel",
    description: "Mastered digital safety and cyber laws",
    icon: "🔒",
    color: "from-purple-500 to-purple-600",
  },
  "employment-laws": {
    id: "employment-laws",
    name: "Workplace Rights Defender",
    description: "Understood all employment rights and laws",
    icon: "💼",
    color: "from-indigo-500 to-indigo-600",
  },
  "human-rights": {
    id: "human-rights",
    name: "Human Rights Advocate",
    description: "Championed universal human rights",
    icon: "👥",
    color: "from-pink-500 to-pink-600",
  },
  "womens-rights": {
    id: "womens-rights",
    name: "Women's Rights Champion",
    description: "Defended women's rights and equality",
    icon: "♀️",
    color: "from-rose-500 to-rose-600",
  },
  "child-rights": {
    id: "child-rights",
    name: "Child Protection Guardian",
    description: "Protected children's rights and welfare",
    icon: "👶",
    color: "from-indigo-500 to-indigo-600",
  },
  "family-marriage-laws": {
    id: "family-marriage-laws",
    name: "Family Law Expert",
    description: "Mastered marriage and family laws",
    icon: "💑",
    color: "from-amber-500 to-amber-600",
  },
  "educational-rights": {
    id: "educational-rights",
    name: "Education Rights Scholar",
    description: "Completed all educational rights scenarios",
    icon: "🎓",
    color: "from-teal-500 to-teal-600",
  },
  "environmental-laws": {
    id: "environmental-laws",
    name: "Environmental Guardian",
    description: "Mastered all environmental protection laws",
    icon: "🌍",
    color: "from-green-500 to-emerald-600",
  },
}

// Calculate total points for a user
export function calculateTotalPoints(completedLevels) {
  if (!completedLevels) return 0
  
  let total = 0
  Object.keys(completedLevels).forEach((category) => {
    const levels = completedLevels[category]
    if (levels && typeof levels === 'object') {
      total += Object.keys(levels).length * POINTS_PER_LEVEL
    }
  })
  
  return total
}

// Get earned badges based on completed categories
export function getEarnedBadges(completedLevels, gameData) {
  const earnedBadges = []
  
  if (!completedLevels || !gameData) return earnedBadges
  
  Object.keys(gameData).forEach((categoryId) => {
    const categoryData = gameData[categoryId]
    const totalLevels = Object.keys(categoryData.levels || {}).length
    const completedCategoryLevels = completedLevels[categoryId] || {}
    const completedCount = Object.keys(completedCategoryLevels).length
    
    // Check if all levels in this category are completed
    if (completedCount >= totalLevels && totalLevels > 0) {
      const badge = CATEGORY_BADGES[categoryId]
      if (badge) {
        earnedBadges.push({
          ...badge,
          earnedDate: completedCategoryLevels[totalLevels]?.completedAt || new Date().toISOString(),
          categoryLevels: totalLevels,
        })
      }
    }
  })
  
  return earnedBadges
}

// Get points for a specific category
export function getCategoryPoints(categoryId, completedLevels) {
  if (!completedLevels || !completedLevels[categoryId]) return 0
  
  const levels = completedLevels[categoryId]
  return Object.keys(levels).length * POINTS_PER_LEVEL
}

// Check if a category is completed
export function isCategoryCompleted(categoryId, completedLevels, totalLevels) {
  if (!completedLevels || !completedLevels[categoryId]) return false
  
  const completedCount = Object.keys(completedLevels[categoryId]).length
  return completedCount >= totalLevels
}

// Get category completion percentage
export function getCategoryProgress(categoryId, completedLevels, totalLevels) {
  if (!completedLevels || !completedLevels[categoryId] || totalLevels === 0) return 0
  
  const completedCount = Object.keys(completedLevels[categoryId]).length
  return Math.round((completedCount / totalLevels) * 100)
}
