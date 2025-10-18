import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from './firebase'

/**
 * Firestore-based user progress tracking
 * Stores per-user data for quiz levels, badges, and points
 */

/**
 * Get user's quiz progress from Firestore
 */
export async function getUserProgress(userId) {
  try {
    const progressRef = doc(db, 'userProgress', userId)
    const progressDoc = await getDoc(progressRef)
    
    if (progressDoc.exists()) {
      return progressDoc.data()
    }
    
    // Return default progress data if doesn't exist
    return {
      completedLevels: {},     // { categoryId: { levelId: { completedAt, points } } }
      totalPoints: 0,
      earnedBadges: [],        // Array of badge IDs
      lastUpdated: null,
      createdAt: new Date().toISOString()
    }
  } catch (error) {
    console.error("Error fetching user progress:", error)
    return null
  }
}

/**
 * Initialize progress data for new user
 */
export async function initializeUserProgress(userId) {
  try {
    const progressRef = doc(db, 'userProgress', userId)
    const initialData = {
      completedLevels: {},
      totalPoints: 0,
      earnedBadges: [],
      lastUpdated: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }
    
    await setDoc(progressRef, initialData)
    return initialData
  } catch (error) {
    console.error("Error initializing user progress:", error)
    return null
  }
}

/**
 * Get progress for a specific category
 */
export async function getCategoryProgress(userId, categoryId) {
  try {
    const progress = await getUserProgress(userId)
    return progress?.completedLevels?.[categoryId] || {}
  } catch (error) {
    console.error("Error fetching category progress:", error)
    return {}
  }
}

/**
 * Check if a level is completed
 */
export async function isLevelCompleted(userId, categoryId, levelId) {
  try {
    const categoryProgress = await getCategoryProgress(userId, categoryId)
    return Boolean(categoryProgress[levelId])
  } catch (error) {
    console.error("Error checking level completion:", error)
    return false
  }
}

/**
 * Mark a level as completed and award points
 */
export async function setLevelCompleted(userId, categoryId, levelId, pointsAwarded = 10) {
  try {
    const progressRef = doc(db, 'userProgress', userId)
    let progress = await getUserProgress(userId)
    
    // Initialize if doesn't exist
    if (!progress) {
      progress = await initializeUserProgress(userId)
    }
    
    // Check if level was already completed
    const isFirstCompletion = !progress.completedLevels?.[categoryId]?.[levelId]
    
    // Update completed levels
    if (!progress.completedLevels) progress.completedLevels = {}
    if (!progress.completedLevels[categoryId]) progress.completedLevels[categoryId] = {}
    
    progress.completedLevels[categoryId][levelId] = {
      completedAt: new Date().toISOString(),
      points: pointsAwarded
    }
    
    // Update total points only if first completion
    if (isFirstCompletion) {
      progress.totalPoints = (progress.totalPoints || 0) + pointsAwarded
    }
    
    progress.lastUpdated = new Date().toISOString()
    
    // Update Firestore (use setDoc with merge to create if doesn't exist)
    await setDoc(progressRef, progress, { merge: true })
    
    return {
      success: true,
      pointsAwarded: isFirstCompletion ? pointsAwarded : 0,
      isFirstCompletion,
      newTotal: progress.totalPoints
    }
  } catch (error) {
    console.error("Error setting level completed:", error)
    return {
      success: false,
      pointsAwarded: 0,
      isFirstCompletion: false
    }
  }
}

/**
 * Get total points for a user
 */
export async function getTotalPoints(userId) {
  try {
    const progress = await getUserProgress(userId)
    return progress?.totalPoints || 0
  } catch (error) {
    console.error("Error fetching total points:", error)
    return 0
  }
}

/**
 * Get all earned badge IDs
 */
export async function getEarnedBadges(userId) {
  try {
    const progress = await getUserProgress(userId)
    return progress?.earnedBadges || []
  } catch (error) {
    console.error("Error fetching earned badges:", error)
    return []
  }
}

/**
 * Award a badge to user
 */
export async function addBadge(userId, badgeId) {
  try {
    const progressRef = doc(db, 'userProgress', userId)
    const progress = await getUserProgress(userId)
    
    if (!progress) {
      await initializeUserProgress(userId)
    }
    
    const badges = progress?.earnedBadges || []
    
    // Check if badge already earned
    if (!badges.includes(badgeId)) {
      badges.push(badgeId)
      
      await setDoc(progressRef, {
        earnedBadges: badges,
        lastUpdated: new Date().toISOString()
      }, { merge: true })
      
      return { success: true, newBadge: true }
    }
    
    return { success: true, newBadge: false }
  } catch (error) {
    console.error("Error adding badge:", error)
    return { success: false, newBadge: false }
  }
}

/**
 * Check if user has earned a category badge and award it
 */
export async function checkAndAwardBadge(userId, categoryId, totalLevelsInCategory) {
  try {
    const categoryProgress = await getCategoryProgress(userId, categoryId)
    const completedCount = Object.keys(categoryProgress).length
    
    // Check if all levels in category are completed
    if (completedCount >= totalLevelsInCategory) {
      const badges = await getEarnedBadges(userId)
      
      if (!badges.includes(categoryId)) {
        await addBadge(userId, categoryId)
        return categoryId // Return the badge ID that was just earned
      }
    }
    
    return null
  } catch (error) {
    console.error("Error checking and awarding badge:", error)
    return null
  }
}

/**
 * Get all progress data (for achievements page)
 */
export async function getAllProgress(userId) {
  try {
    const progress = await getUserProgress(userId)
    return progress?.completedLevels || {}
  } catch (error) {
    console.error("Error fetching all progress:", error)
    return {}
  }
}

/**
 * Reset category progress (for admin/testing)
 */
export async function resetCategoryProgress(userId, categoryId) {
  try {
    const progressRef = doc(db, 'userProgress', userId)
    const progress = await getUserProgress(userId)
    
    if (progress && progress.completedLevels && progress.completedLevels[categoryId]) {
      delete progress.completedLevels[categoryId]
      
      await setDoc(progressRef, {
        completedLevels: progress.completedLevels,
        lastUpdated: new Date().toISOString()
      }, { merge: true })
      
      return { success: true }
    }
    
    return { success: false, message: "Category not found" }
  } catch (error) {
    console.error("Error resetting category progress:", error)
    return { success: false, message: error.message }
  }
}

/**
 * Reset all progress (for admin/testing)
 */
export async function resetAllProgress(userId) {
  try {
    const progressRef = doc(db, 'userProgress', userId)
    
    await setDoc(progressRef, {
      completedLevels: {},
      totalPoints: 0,
      earnedBadges: [],
      lastUpdated: new Date().toISOString(),
      createdAt: new Date().toISOString()
    })
    
    return { success: true }
  } catch (error) {
    console.error("Error resetting all progress:", error)
    return { success: false, message: error.message }
  }
}

/**
 * Migrate data from localStorage to Firestore
 * Call this once per user to transfer their existing progress
 */
export async function migrateFromLocalStorage(userId) {
  if (typeof window === "undefined") return { success: false, message: "Not in browser" }
  
  try {
    // Get data from localStorage
    const allProgress = {}
    const keys = Object.keys(localStorage)
    
    keys.forEach((key) => {
      if (key.startsWith("lr_progress_")) {
        const category = key.replace("lr_progress_", "")
        allProgress[category] = JSON.parse(localStorage.getItem(key) || "{}")
      }
    })
    
    const totalPoints = parseInt(localStorage.getItem("lr_total_points") || "0", 10)
    const earnedBadges = JSON.parse(localStorage.getItem("lr_badges") || "[]")
    
    // Check if there's any data to migrate
    if (Object.keys(allProgress).length === 0 && totalPoints === 0 && earnedBadges.length === 0) {
      return { success: false, message: "No data to migrate" }
    }
    
    // Save to Firestore
    const progressRef = doc(db, 'userProgress', userId)
    await setDoc(progressRef, {
      completedLevels: allProgress,
      totalPoints: totalPoints,
      earnedBadges: earnedBadges,
      lastUpdated: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      migratedFrom: "localStorage",
      migratedAt: new Date().toISOString()
    })
    
    return {
      success: true,
      message: "Data migrated successfully",
      data: {
        levels: Object.keys(allProgress).length,
        points: totalPoints,
        badges: earnedBadges.length
      }
    }
  } catch (error) {
    console.error("Error migrating from localStorage:", error)
    return { success: false, message: error.message }
  }
}
