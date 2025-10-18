"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { 
  getUserStreakData, 
  updateStreakOnLogin, 
  useHintToken as useHintTokenService,
  awardPoints as awardPointsService,
  changeActiveTitle as changeActiveTitleService
} from '@/lib/streak-service'

const StreakContext = createContext({})

export const useStreak = () => useContext(StreakContext)

export const StreakProvider = ({ children }) => {
  const { user } = useAuth()
  const [streakData, setStreakData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [newReward, setNewReward] = useState(null)
  const [showRewardModal, setShowRewardModal] = useState(false)

  // Load streak data when user changes
  useEffect(() => {
    if (user) {
      loadStreakData()
    } else {
      setStreakData(null)
      setLoading(false)
    }
  }, [user])

  const loadStreakData = async () => {
    if (!user) return

    try {
      setLoading(true)
      const data = await getUserStreakData(user.uid)
      setStreakData(data)
    } catch (error) {
      console.error("Error loading streak data:", error)
      // Set empty streak data to prevent blank pages
      setStreakData({
        currentStreak: 0,
        longestStreak: 0,
        lastLoginDate: null,
        totalPoints: 0,
        badges: [],
        titles: [],
        hintTokens: 0,
        cosmetics: [],
        themes: [],
        claimedRewards: {}
      })
    } finally {
      setLoading(false)
    }
  }

  // Check and update streak on mount (when user logs in)
  useEffect(() => {
    if (user && !loading && streakData) {
      checkAndUpdateStreak()
    }
  }, [user, loading])

  const checkAndUpdateStreak = async () => {
    if (!user) return

    try {
      const result = await updateStreakOnLogin(user.uid)
      
      if (result && result.streakIncreased) {
        setStreakData(result.streakData)
        
        if (result.newReward) {
          setNewReward({
            reward: result.newReward,
            day: result.currentStreak
          })
          setShowRewardModal(true)
        }
      }
    } catch (error) {
      console.error("Error checking streak:", error)
    }
  }

  const useHintToken = async () => {
    if (!user) return { success: false, message: "Not logged in" }

    const result = await useHintTokenService(user.uid)
    
    if (result.success) {
      // Update local state
      setStreakData(prev => ({
        ...prev,
        hintTokens: result.remainingTokens
      }))
    }
    
    return result
  }

  const awardPoints = async (points, source = 'quiz') => {
    if (!user) return { success: false }

    const result = await awardPointsService(user.uid, points, source)
    
    if (result.success) {
      // Update local state
      setStreakData(prev => ({
        ...prev,
        totalPoints: result.newTotal
      }))
    }
    
    return result
  }

  const changeActiveTitle = async (titleName) => {
    if (!user) return { success: false, message: "Not logged in" }

    const result = await changeActiveTitleService(user.uid, titleName)
    
    if (result.success) {
      // Update local state
      setStreakData(prev => ({
        ...prev,
        currentTitle: titleName
      }))
    }
    
    return result
  }

  const closeRewardModal = () => {
    setShowRewardModal(false)
    setNewReward(null)
  }

  const refreshStreakData = async () => {
    await loadStreakData()
  }

  const value = {
    streakData,
    loading,
    newReward,
    showRewardModal,
    useHintToken,
    awardPoints,
    changeActiveTitle,
    closeRewardModal,
    refreshStreakData
  }

  return (
    <StreakContext.Provider value={value}>
      {children}
    </StreakContext.Provider>
  )
}
