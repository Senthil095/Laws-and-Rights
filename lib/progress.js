"use client"

// Simple localStorage-based progress tracker
// Keys: lr_progress_<category> => { [levelNumber]: true }

export function getCategoryProgress(category) {
  if (typeof window === "undefined") return {}
  try {
    const raw = localStorage.getItem(`lr_progress_${category}`)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function isLevelCompleted(category, level) {
  const progress = getCategoryProgress(category)
  return Boolean(progress[level])
}

export function setLevelCompleted(category, level) {
  if (typeof window === "undefined") return
  const progress = getCategoryProgress(category)
  progress[level] = true
  try {
    localStorage.setItem(`lr_progress_${category}`,(JSON.stringify(progress)))
  } catch {}
}

export function resetCategoryProgress(category) {
  if (typeof window === "undefined") return
  try {
    localStorage.removeItem(`lr_progress_${category}`)
  } catch {}
}
