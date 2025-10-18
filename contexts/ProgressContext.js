"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import {
  getUserProgress,
  setLevelCompleted as setLevelCompletedService,
  getCategoryProgress as getCategoryProgressService,
  isLevelCompleted as isLevelCompletedService,
  getTotalPoints as getTotalPointsService,
  getEarnedBadges as getEarnedBadgesService,
  getAllProgress as getAllProgressService,
  checkAndAwardBadge as checkAndAwardBadgeService,
  migrateFromLocalStorage
} from '@/lib/user-progress-service'

const ProgressContext = createContext({})

export const useProgress = () => useContext(ProgressContext)

export const ProgressProvider = ({ children }) => {
  const { user } = useAuth()
  const [progressData, setProgressData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [migrated, setMigrated] = useState(false)

  // Load progress data when user changes
  useEffect(() => {
    if (user) {
      loadProgressData()
      attemptMigration()
    } else {
      setProgressData(null)
      setLoading(false)
    }
  }, [user])

  const loadProgressData = async () => {
    if (!user) return

    try {
      setLoading(true)
      const data = await getUserProgress(user.uid)
      setProgressData(data)
    } catch (error) {
      console.error("Error loading progress data:", error)
      // Set empty progress data to prevent blank pages
      setProgressData({
        completedLevels: {},
        totalPoints: 0,
        earnedBadges: [],
        lastUpdated: null
      })
    } finally {
      setLoading(false)
    }
  }

  const attemptMigration = async () => {
    if (!user || migrated) return

    try {
      // Check if localStorage has data
      if (typeof window !== "undefined") {
        const hasLocalData = localStorage.getItem("lr_total_points") || localStorage.getItem("lr_badges")
        
        if (hasLocalData) {
          const result = await migrateFromLocalStorage(user.uid)
          if (result.success) {
            console.log("Successfully migrated data from localStorage to Firestore")
            // Clear localStorage after successful migration
            const keys = Object.keys(localStorage)
            keys.forEach((key) => {
              if (key.startsWith("lr_")) {
                localStorage.removeItem(key)
              }
            })
            // Reload progress data
            await loadProgressData()
          }
        }
      }
      setMigrated(true)
    } catch (error) {
      console.error("Error during migration:", error)
    }
  }

  const setLevelCompleted = async (categoryId, levelId, pointsAwarded = 10) => {
    if (!user) return { success: false, message: "Not logged in" }

    const result = await setLevelCompletedService(user.uid, categoryId, levelId, pointsAwarded)
    
    if (result.success) {
      // Reload progress data
      await loadProgressData()
    }
    
    return result
  }

  const getCategoryProgress = async (categoryId) => {
    if (!user) return {}
    return await getCategoryProgressService(user.uid, categoryId)
  }

  const isLevelCompleted = async (categoryId, levelId) => {
    if (!user) return false
    return await isLevelCompletedService(user.uid, categoryId, levelId)
  }

  const getTotalPoints = async () => {
    if (!user) return 0
    return await getTotalPointsService(user.uid)
  }

  const getEarnedBadges = async () => {
    if (!user) return []
    return await getEarnedBadgesService(user.uid)
  }

  const getAllProgress = async () => {
    if (!user) return {}
    return await getAllProgressService(user.uid)
  }

  const checkAndAwardBadge = async (categoryId, totalLevelsInCategory) => {
    if (!user) return null
    
    const badgeAwarded = await checkAndAwardBadgeService(user.uid, categoryId, totalLevelsInCategory)
    
    if (badgeAwarded) {
      // Reload progress data
      await loadProgressData()
    }
    
    return badgeAwarded
  }

  const refreshProgress = async () => {
    await loadProgressData()
  }

  // Provide sync methods that use cached data
  const getCachedCategoryProgress = (categoryId) => {
    return progressData?.completedLevels?.[categoryId] || {}
  }

  const isCachedLevelCompleted = (categoryId, levelId) => {
    return Boolean(progressData?.completedLevels?.[categoryId]?.[levelId])
  }

  const getCachedTotalPoints = () => {
    return progressData?.totalPoints || 0
  }

  const getCachedEarnedBadges = () => {
    return progressData?.earnedBadges || []
  }

  const getCachedAllProgress = () => {
    return progressData?.completedLevels || {}
  }

  const value = {
    progressData,
    loading,
    // Async methods
    setLevelCompleted,
    getCategoryProgress,
    isLevelCompleted,
    getTotalPoints,
    getEarnedBadges,
    getAllProgress,
    checkAndAwardBadge,
    refreshProgress,
    // Sync methods (use cached data)
    getCachedCategoryProgress,
    isCachedLevelCompleted,
    getCachedTotalPoints,
    getCachedEarnedBadges,
    getCachedAllProgress
  }

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
}
