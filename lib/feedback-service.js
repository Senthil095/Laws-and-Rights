import { collection, addDoc, getDocs, query, orderBy, where, Timestamp } from 'firebase/firestore'
import { db } from './firebase'

/**
 * Feedback categories
 */
export const FEEDBACK_CATEGORIES = {
  GENERAL: 'general',
  BUG_REPORT: 'bug_report',
  FEATURE_REQUEST: 'feature_request',
  APPRECIATION: 'appreciation'
}

export const FEEDBACK_CATEGORY_LABELS = {
  [FEEDBACK_CATEGORIES.GENERAL]: 'General Feedback',
  [FEEDBACK_CATEGORIES.BUG_REPORT]: 'Bug Report',
  [FEEDBACK_CATEGORIES.FEATURE_REQUEST]: 'Feature Request',
  [FEEDBACK_CATEGORIES.APPRECIATION]: 'Appreciation'
}

/**
 * Submit feedback to Firestore
 */
export async function submitFeedback({
  userId,
  userName,
  userEmail,
  category,
  subject,
  message,
  rating = null,
  page = null
}) {
  try {
    const feedbackData = {
      userId: userId || 'anonymous',
      userName: userName || 'Anonymous User',
      userEmail: userEmail || '',
      category,
      subject,
      message,
      rating,
      page,
      status: 'pending', // pending, reviewed, resolved
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    }

    const docRef = await addDoc(collection(db, 'feedback'), feedbackData)
    
    return {
      success: true,
      feedbackId: docRef.id,
      message: 'Feedback submitted successfully!'
    }
  } catch (error) {
    console.error('Error submitting feedback:', error)
    return {
      success: false,
      message: 'Failed to submit feedback. Please try again.'
    }
  }
}

/**
 * Get all feedback (admin only)
 */
export async function getAllFeedback() {
  try {
    const q = query(
      collection(db, 'feedback'),
      orderBy('createdAt', 'desc')
    )
    
    const querySnapshot = await getDocs(q)
    const feedback = []
    
    querySnapshot.forEach((doc) => {
      feedback.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate?.() || new Date()
      })
    })
    
    return feedback
  } catch (error) {
    console.error('Error fetching feedback:', error)
    return []
  }
}

/**
 * Get feedback by category
 */
export async function getFeedbackByCategory(category) {
  try {
    const q = query(
      collection(db, 'feedback'),
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    )
    
    const querySnapshot = await getDocs(q)
    const feedback = []
    
    querySnapshot.forEach((doc) => {
      feedback.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate?.() || new Date()
      })
    })
    
    return feedback
  } catch (error) {
    console.error('Error fetching feedback by category:', error)
    return []
  }
}

/**
 * Get feedback stats
 */
export async function getFeedbackStats() {
  try {
    const allFeedback = await getAllFeedback()
    
    const stats = {
      total: allFeedback.length,
      byCategory: {
        [FEEDBACK_CATEGORIES.GENERAL]: 0,
        [FEEDBACK_CATEGORIES.BUG_REPORT]: 0,
        [FEEDBACK_CATEGORIES.FEATURE_REQUEST]: 0,
        [FEEDBACK_CATEGORIES.APPRECIATION]: 0
      },
      byStatus: {
        pending: 0,
        reviewed: 0,
        resolved: 0
      }
    }
    
    allFeedback.forEach(item => {
      if (item.category) {
        stats.byCategory[item.category]++
      }
      if (item.status) {
        stats.byStatus[item.status]++
      }
    })
    
    return stats
  } catch (error) {
    console.error('Error getting feedback stats:', error)
    return null
  }
}

/**
 * Export feedback to Excel format (returns data structure)
 */
export function prepareFeedbackForExcel(feedbackList) {
  return feedbackList.map(item => ({
    'Feedback ID': item.id,
    'Date': item.createdAt ? new Date(item.createdAt).toLocaleString() : '',
    'Category': FEEDBACK_CATEGORY_LABELS[item.category] || item.category,
    'Status': item.status?.toUpperCase() || 'PENDING',
    'User Name': item.userName || 'Anonymous',
    'User Email': item.userEmail || 'N/A',
    'Subject': item.subject || 'N/A',
    'Message': item.message || '',
    'Rating': item.rating ? `${item.rating}/5` : 'N/A',
    'Page': item.page || 'N/A'
  }))
}

/**
 * Export feedback by category to Excel format
 */
export function prepareFeedbackByCategoryForExcel(allFeedback) {
  const categorized = {
    General: [],
    'Bug Report': [],
    'Feature Request': [],
    'Appreciation': []
  }
  
  allFeedback.forEach(item => {
    const categoryLabel = FEEDBACK_CATEGORY_LABELS[item.category] || 'General'
    const data = {
      'Date': item.createdAt ? new Date(item.createdAt).toLocaleString() : '',
      'User': item.userName || 'Anonymous',
      'Email': item.userEmail || 'N/A',
      'Subject': item.subject || 'N/A',
      'Message': item.message || '',
      'Status': item.status?.toUpperCase() || 'PENDING',
      'Rating': item.rating ? `${item.rating}/5` : 'N/A'
    }
    
    if (item.category === FEEDBACK_CATEGORIES.GENERAL) {
      categorized.General.push(data)
    } else if (item.category === FEEDBACK_CATEGORIES.BUG_REPORT) {
      categorized['Bug Report'].push(data)
    } else if (item.category === FEEDBACK_CATEGORIES.FEATURE_REQUEST) {
      categorized['Feature Request'].push(data)
    } else if (item.category === FEEDBACK_CATEGORIES.APPRECIATION) {
      categorized['Appreciation'].push(data)
    }
  })
  
  return categorized
}
