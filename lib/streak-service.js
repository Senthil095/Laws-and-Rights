import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from './firebase'
import { getRewardForDay } from './streak-rewards'

/**
 * Get user's streak data from Firestore
 */
export async function getUserStreakData(userId) {
  try {
    const streakRef = doc(db, 'streaks', userId)
    const streakDoc = await getDoc(streakRef)
    
    if (streakDoc.exists()) {
      return streakDoc.data()
    }
    
    // Return default streak data if doesn't exist
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastLoginDate: null,
      totalPoints: 0,
      badges: [],
      titles: [],
      hintTokens: 0,
      cosmetics: [],
      themes: [],
      claimedRewards: {},
      streakHistory: []
    }
  } catch (error) {
    console.error("Error fetching streak data:", error)
    return null
  }
}

/**
 * Initialize streak data for new user
 */
export async function initializeStreakData(userId) {
  try {
    const streakRef = doc(db, 'streaks', userId)
    const initialData = {
      currentStreak: 0,
      longestStreak: 0,
      lastLoginDate: null,
      totalPoints: 0,
      badges: [],
      titles: [],
      currentTitle: null,
      hintTokens: 0,
      cosmetics: [],
      themes: [],
      claimedRewards: {},
      streakHistory: [],
      createdAt: new Date().toISOString()
    }
    
    await setDoc(streakRef, initialData)
    return initialData
  } catch (error) {
    console.error("Error initializing streak data:", error)
    return null
  }
}

/**
 * Check if user has logged in today
 */
function hasLoggedInToday(lastLoginDate) {
  if (!lastLoginDate) return false
  
  const today = new Date()
  const lastLogin = new Date(lastLoginDate)
  
  return (
    today.getDate() === lastLogin.getDate() &&
    today.getMonth() === lastLogin.getMonth() &&
    today.getFullYear() === lastLogin.getFullYear()
  )
}

/**
 * Check if streak should continue (logged in yesterday)
 */
function shouldContinueStreak(lastLoginDate) {
  if (!lastLoginDate) return false
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const lastLogin = new Date(lastLoginDate)
  lastLogin.setHours(0, 0, 0, 0)
  
  const diffTime = today - lastLogin
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  return diffDays === 1
}

/**
 * Update user's streak on login
 */
export async function updateStreakOnLogin(userId) {
  try {
    const streakRef = doc(db, 'streaks', userId)
    let streakData = await getUserStreakData(userId)
    
    // Initialize if doesn't exist
    if (!streakData) {
      streakData = await initializeStreakData(userId)
    }
    
    // Check if already logged in today
    if (hasLoggedInToday(streakData.lastLoginDate)) {
      return {
        streakData,
        newReward: null,
        streakIncreased: false
      }
    }
    
    // Determine if streak continues or resets
    let newStreak
    if (shouldContinueStreak(streakData.lastLoginDate)) {
      newStreak = streakData.currentStreak + 1
    } else {
      newStreak = 1 // Reset streak
    }
    
    // Get reward for current day
    const reward = getRewardForDay(newStreak)
    
    // Update streak data
    const updatedData = {
      currentStreak: newStreak,
      longestStreak: Math.max(newStreak, streakData.longestStreak),
      lastLoginDate: new Date().toISOString(),
      streakHistory: [
        ...streakData.streakHistory,
        {
          day: newStreak,
          date: new Date().toISOString(),
          rewardClaimed: !!reward
        }
      ]
    }
    
    // Apply rewards
    if (reward) {
      if (reward.points) {
        updatedData.totalPoints = (streakData.totalPoints || 0) + reward.points
      }
      
      if (reward.badge) {
        updatedData.badges = [...(streakData.badges || []), {
          name: reward.badge,
          earnedOn: new Date().toISOString(),
          day: newStreak,
          golden: reward.golden,
          ultimate: reward.ultimate
        }]
      }
      
      if (reward.title) {
        updatedData.titles = [...(streakData.titles || []), {
          name: reward.title,
          earnedOn: new Date().toISOString(),
          day: newStreak
        }]
        // Auto-equip new title
        updatedData.currentTitle = reward.title
      }
      
      if (reward.hintToken) {
        updatedData.hintTokens = (streakData.hintTokens || 0) + reward.hintToken
      }
      
      if (reward.cosmetic) {
        updatedData.cosmetics = [...(streakData.cosmetics || []), {
          type: reward.cosmetic,
          unlockedOn: new Date().toISOString(),
          day: newStreak
        }]
      }
      
      if (reward.theme) {
        updatedData.themes = [...(streakData.themes || []), {
          type: reward.theme,
          unlockedOn: new Date().toISOString(),
          day: newStreak
        }]
      }
      
      // Mark reward as claimed
      updatedData.claimedRewards = {
        ...streakData.claimedRewards,
        [newStreak]: true
      }
    }
    
    // Update Firestore (use setDoc with merge to create if doesn't exist)
    await setDoc(streakRef, updatedData, { merge: true })
    
    return {
      streakData: { ...streakData, ...updatedData },
      newReward: reward,
      streakIncreased: true,
      currentStreak: newStreak
    }
  } catch (error) {
    console.error("Error updating streak:", error)
    return null
  }
}

/**
 * Use a hint token
 */
export async function useHintToken(userId) {
  try {
    const streakRef = doc(db, 'streaks', userId)
    const streakData = await getUserStreakData(userId)
    
    if (!streakData || streakData.hintTokens <= 0) {
      return { success: false, message: "No hint tokens available" }
    }
    
    await setDoc(streakRef, {
      hintTokens: streakData.hintTokens - 1
    }, { merge: true })
    
    return { success: true, remainingTokens: streakData.hintTokens - 1 }
  } catch (error) {
    console.error("Error using hint token:", error)
    return { success: false, message: "Failed to use hint token" }
  }
}

/**
 * Award additional points (from quizzes, etc.)
 */
export async function awardPoints(userId, points, source = 'quiz') {
  try {
    const streakRef = doc(db, 'streaks', userId)
    const streakData = await getUserStreakData(userId)
    
    if (!streakData) return { success: false }
    
    await updateDoc(streakRef, {
      totalPoints: (streakData.totalPoints || 0) + points
    })
    
    return { 
      success: true, 
      newTotal: (streakData.totalPoints || 0) + points 
    }
  } catch (error) {
    console.error("Error awarding points:", error)
    return { success: false }
  }
}

/**
 * Change user's active title
 */
export async function changeActiveTitle(userId, titleName) {
  try {
    const streakRef = doc(db, 'streaks', userId)
    const streakData = await getUserStreakData(userId)
    
    // Check if user has this title
    const hasTitle = streakData.titles?.some(t => t.name === titleName)
    
    if (!hasTitle) {
      return { success: false, message: "Title not unlocked" }
    }
    
    await setDoc(streakRef, {
      currentTitle: titleName
    }, { merge: true })
    
    return { success: true }
  } catch (error) {
    console.error("Error changing title:", error)
    return { success: false, message: "Failed to change title" }
  }
}

/**
 * Get leaderboard data (top streaks)
 */
export async function getLeaderboard(limit = 10) {
  // Note: This would require a collection-wide query
  // For now, return empty array - implement when needed
  return []
}
