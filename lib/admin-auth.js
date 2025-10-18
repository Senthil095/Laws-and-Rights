// Admin authentication utilities

const ADMIN_CREDENTIALS = {
  id: '63687195116',
  password: 'Admin@123'
}

/**
 * Verify admin credentials
 */
export function verifyAdminCredentials(id, password) {
  return id === ADMIN_CREDENTIALS.id && password === ADMIN_CREDENTIALS.password
}

/**
 * Store admin session in localStorage
 */
export function setAdminSession() {
  if (typeof window === 'undefined') return
  
  const sessionData = {
    isAdmin: true,
    loginTime: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
  }
  
  localStorage.setItem('admin_session', JSON.stringify(sessionData))
}

/**
 * Check if admin session is valid
 */
export function isAdminAuthenticated() {
  if (typeof window === 'undefined') return false
  
  try {
    const sessionData = localStorage.getItem('admin_session')
    if (!sessionData) return false
    
    const session = JSON.parse(sessionData)
    const now = new Date()
    const expiresAt = new Date(session.expiresAt)
    
    return session.isAdmin && now < expiresAt
  } catch {
    return false
  }
}

/**
 * Clear admin session (logout)
 */
export function clearAdminSession() {
  if (typeof window === 'undefined') return
  localStorage.removeItem('admin_session')
}

/**
 * Get admin session info
 */
export function getAdminSession() {
  if (typeof window === 'undefined') return null
  
  try {
    const sessionData = localStorage.getItem('admin_session')
    if (!sessionData) return null
    
    return JSON.parse(sessionData)
  } catch {
    return null
  }
}
