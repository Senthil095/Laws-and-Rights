"use client"

// Simple localStorage-based progress tracker with points system
// Keys: 
// - lr_progress_<category> => { [levelNumber]: { completedAt: timestamp, points: 10 } }
// - lr_total_points => total points across all categories
// - lr_badges => array of earned badge IDs

export function getCategoryProgress(category) {
  if (typeof window === "undefined") return {}
  try {
    const raw = localStorage.getItem(`lr_progress_${category}`)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function getAllProgress() {
  if (typeof window === "undefined") return {}
  
  try {
    const allProgress = {}
    const keys = Object.keys(localStorage)
    
    keys.forEach((key) => {
      if (key.startsWith("lr_progress_")) {
        const category = key.replace("lr_progress_", "")
        allProgress[category] = JSON.parse(localStorage.getItem(key) || "{}")
      }
    })
    
    return allProgress
  } catch {
    return {}
  }
}

export function isLevelCompleted(category, level) {
  const progress = getCategoryProgress(category)
  return Boolean(progress[level])
}

export function setLevelCompleted(category, level, pointsAwarded = 10) {
  if (typeof window === "undefined") return
  
  const progress = getCategoryProgress(category)
  
  // Only award points if level wasn't completed before
  const isFirstCompletion = !progress[level]
  
  progress[level] = {
    completedAt: new Date().toISOString(),
    points: pointsAwarded,
  }
  
  try {
    localStorage.setItem(`lr_progress_${category}`, JSON.stringify(progress))
    
    // Update total points
    if (isFirstCompletion) {
      const currentTotal = getTotalPoints()
      localStorage.setItem("lr_total_points", String(currentTotal + pointsAwarded))
    }
  } catch {}
  
  return isFirstCompletion ? pointsAwarded : 0
}

export function getTotalPoints() {
  if (typeof window === "undefined") return 0
  
  try {
    const stored = localStorage.getItem("lr_total_points")
    return stored ? parseInt(stored, 10) : 0
  } catch {
    return 0
  }
}

export function addBadge(badgeId) {
  if (typeof window === "undefined") return
  
  try {
    const badges = getEarnedBadges()
    if (!badges.includes(badgeId)) {
      badges.push(badgeId)
      localStorage.setItem("lr_badges", JSON.stringify(badges))
    }
  } catch {}
}

export function getEarnedBadges() {
  if (typeof window === "undefined") return []
  
  try {
    const raw = localStorage.getItem("lr_badges")
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function checkAndAwardBadge(category, totalLevelsInCategory) {
  if (typeof window === "undefined") return null
  
  const progress = getCategoryProgress(category)
  const completedCount = Object.keys(progress).length
  
  // Check if all levels in category are completed
  if (completedCount >= totalLevelsInCategory) {
    const badges = getEarnedBadges()
    if (!badges.includes(category)) {
      addBadge(category)
      return category // Return the badge ID that was just earned
    }
  }
  
  return null
}

export function resetCategoryProgress(category) {
  if (typeof window === "undefined") return
  try {
    localStorage.removeItem(`lr_progress_${category}`)
  } catch {}
}

export function resetAllProgress() {
  if (typeof window === "undefined") return
  
  try {
    const keys = Object.keys(localStorage)
    keys.forEach((key) => {
      if (key.startsWith("lr_")) {
        localStorage.removeItem(key)
      }
    })
  } catch {}
}
