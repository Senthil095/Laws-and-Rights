# User-Specific Progress Tracking System

## Overview
The user progress system has been **migrated from localStorage to Firestore** to enable per-user tracking of quiz progress, earned badges, and points. This ensures that each user's progress is saved to their account and accessible across devices.

## Migration Summary

### **Before** (localStorage)
- Progress stored only in browser
- Not user-specific
- Lost when clearing browser data
- Not synced across devices

### **After** (Firestore)
- Progress stored in Firestore per user
- Fully user-specific by `userId`
- Persists across sessions and devices
- Automatic migration from localStorage

## File Structure

```
lib/
├── user-progress-service.js  # NEW: Firestore service for user progress
└── progress.js                # DEPRECATED: Old localStorage functions (keep for reference)

contexts/
└── ProgressContext.js         # NEW: React context for progress management
```

## Database Structure (Firestore)

**Collection:** `userProgress/{userId}`

```javascript
{
  completedLevels: {
    // Structure: { categoryId: { levelId: { completedAt, points } } }
    "fundamental-rights": {
      "1": {
        completedAt: "2025-10-18T08:00:00.000Z",
        points: 10
      },
      "2": {
        completedAt: "2025-10-18T08:15:00.000Z",
        points: 10
      }
    },
    "consumer-rights": {
      "1": {
        completedAt: "2025-10-18T09:00:00.000Z",
        points: 10
      }
    }
  },
  totalPoints: 30,              // Total quiz points earned
  earnedBadges: [               // Array of category badge IDs
    "fundamental-rights",
    "consumer-rights"
  ],
  lastUpdated: "2025-10-18T09:00:00.000Z",
  createdAt: "2025-10-01T10:00:00.000Z",
  migratedFrom: "localStorage", // Optional: indicates data was migrated
  migratedAt: "2025-10-18T08:00:00.000Z"
}
```

## Key Functions

### Service Layer (`lib/user-progress-service.js`)

#### `getUserProgress(userId)`
Fetches all progress data for a user.

```javascript
const progress = await getUserProgress(userId)
// Returns: { completedLevels, totalPoints, earnedBadges, ... }
```

#### `setLevelCompleted(userId, categoryId, levelId, points)`
Marks a level as completed and awards points.

```javascript
const result = await setLevelCompleted(userId, "fundamental-rights", "1", 10)
// Returns: { success, pointsAwarded, isFirstCompletion, newTotal }
```

#### `checkAndAwardBadge(userId, categoryId, totalLevels)`
Checks if user completed all levels in a category and awards badge.

```javascript
const badgeId = await checkAndAwardBadge(userId, "fundamental-rights", 5)
// Returns: categoryId if badge earned, null otherwise
```

#### `migrateFromLocalStorage(userId)`
One-time migration of localStorage data to Firestore.

```javascript
const result = await migrateFromLocalStorage(userId)
// Returns: { success, message, data }
```

### Context Layer (`contexts/ProgressContext.js`)

#### Using the Hook

```javascript
import { useProgress } from '@/contexts/ProgressContext'

function MyComponent() {
  const {
    progressData,              // Current user's progress data
    loading,                   // Loading state
    setLevelCompleted,         // Async: Mark level completed
    checkAndAwardBadge,        // Async: Check and award badge
    getCachedTotalPoints,      // Sync: Get points from cached data
    getCachedEarnedBadges,     // Sync: Get badges from cached data
    isCachedLevelCompleted,    // Sync: Check if level completed
    refreshProgress            // Refresh data from Firestore
  } = useProgress()
  
  // Use cached data for display (no async needed)
  const points = getCachedTotalPoints()
  const isCompleted = isCachedLevelCompleted("fundamental-rights", "1")
  
  // Use async methods for updates
  const handleComplete = async () => {
    await setLevelCompleted("fundamental-rights", "1", 10)
  }
}
```

## Automatic Migration

The system automatically migrates data from localStorage to Firestore when a user logs in:

1. **On Login**: `ProgressContext` checks if localStorage has data
2. **If Data Found**: Calls `migrateFromLocalStorage(userId)`
3. **Migration**: Transfers all progress to Firestore
4. **Cleanup**: Clears localStorage after successful migration
5. **Reload**: Refreshes progress data from Firestore

## Updated Components

### 1. **Game Level Page** (`app/game/[category]/[level]/page.jsx`)

**Changes:**
- Uses `useProgress()` hook instead of localStorage functions
- Requires user login to save progress
- Uses async/await for saving progress
- Shows toast notification if not logged in

**Example:**
```javascript
const { user } = useAuth()
const { setLevelCompleted, checkAndAwardBadge } = useProgress()

const handleSubmit = async () => {
  if (!user) {
    toast({ title: "Login Required", variant: "destructive" })
    return
  }
  
  const result = await setLevelCompleted(category, level, 10)
  if (result.success) {
    // Show success message
  }
}
```

### 2. **Category Page** (`app/game/[category]/page.jsx`)

**Changes:**
- Uses `progressData` from `useProgress()` hook
- Displays user-specific progress and badges
- No more localStorage calls

**Example:**
```javascript
const { progressData } = useProgress()
const progress = progressData?.completedLevels?.[category] || {}
const earnedBadges = progressData?.earnedBadges || []
```

### 3. **Achievements Page** (`app/achievements/page.jsx`)

**Changes:**
- Uses `progressData` from `useProgress()` hook
- Shows combined quiz and streak progress
- Redirects to login if not authenticated

**Example:**
```javascript
const { progressData, loading } = useProgress()
const totalPoints = progressData?.totalPoints || 0
const badges = progressData?.earnedBadges || []
```

## Security Rules

Add to Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User progress - users can only access their own
    match /userProgress/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Benefits

### ✅ **User-Specific Tracking**
- Each user has their own progress
- Multiple users can use the same device
- Progress tied to account, not browser

### ✅ **Cross-Device Sync**
- Login from any device
- Progress automatically syncs
- Same experience everywhere

### ✅ **Data Persistence**
- Never lost when clearing browser
- Backed up in Firestore
- Reliable and secure

### ✅ **Better Analytics**
- Track individual user progress
- See completion rates per user
- Analyze learning patterns

### ✅ **Future Features**
- Leaderboards
- Social features
- Progress sharing
- Achievements history

## Testing

### Test User Progress
1. **Sign up** with a new account
2. **Complete a level** in any category
3. **Check achievements page** - progress should show
4. **Logout and login** again - progress persists
5. **Login from different browser** - same progress

### Test Migration
1. **Clear Firestore** for your user (using Firebase Console)
2. **Add some data** to localStorage manually (dev tools)
3. **Refresh page** while logged in
4. **Check Firestore** - data should be migrated
5. **Check localStorage** - should be cleared

### Test Multi-User
1. **Complete levels** with User A
2. **Logout** and login as User B
3. **Check achievements** - should show User B's progress (not A's)
4. **Complete different levels** with User B
5. **Switch back to User A** - should show A's original progress

## Migration from Old System

If you have existing users with localStorage data:

1. **Users login** - automatic migration happens
2. **Data transferred** to Firestore
3. **localStorage cleared** after migration
4. **Future sessions** use Firestore

No action needed from users!

## Troubleshooting

### Progress Not Saving
**Check:**
- User is logged in (`user` exists)
- Firestore is enabled in Firebase Console
- Security rules allow write access
- Network connection is active

### Migration Not Working
**Check:**
- localStorage has data (check dev tools)
- User is authenticated
- `migrateFromLocalStorage` is called in ProgressContext
- Check browser console for errors

### Different Progress on Different Devices
**Check:**
- Same user account is logged in
- Data synced from Firestore (check loading state)
- Network connection is stable
- Firestore security rules are correct

## Future Enhancements

1. **Offline Support**: Cache progress locally and sync when online
2. **Progress History**: Track attempt history for each level
3. **Time Tracking**: Record time spent on each level
4. **Difficulty Levels**: Track performance and adjust difficulty
5. **Social Features**: Share progress with friends
6. **Achievements Timeline**: Visual timeline of user progress
7. **Export Progress**: Allow users to export their data

## API Reference

### Context Methods

| Method | Type | Description |
|--------|------|-------------|
| `progressData` | Object | Current user's progress data |
| `loading` | Boolean | Loading state |
| `setLevelCompleted(category, level, points)` | Async | Mark level as completed |
| `checkAndAwardBadge(category, totalLevels)` | Async | Check and award badge |
| `getCachedTotalPoints()` | Sync | Get total points (cached) |
| `getCachedEarnedBadges()` | Sync | Get earned badges (cached) |
| `getCachedCategoryProgress(category)` | Sync | Get category progress (cached) |
| `isCachedLevelCompleted(category, level)` | Sync | Check level completion (cached) |
| `refreshProgress()` | Async | Refresh from Firestore |

### Service Methods

| Method | Parameters | Returns |
|--------|------------|---------|
| `getUserProgress(userId)` | userId: string | Promise<ProgressData> |
| `setLevelCompleted(userId, category, level, points)` | userId, category, level, points | Promise<Result> |
| `checkAndAwardBadge(userId, category, totalLevels)` | userId, category, totalLevels | Promise<badgeId\|null> |
| `getTotalPoints(userId)` | userId: string | Promise<number> |
| `getEarnedBadges(userId)` | userId: string | Promise<string[]> |
| `migrateFromLocalStorage(userId)` | userId: string | Promise<Result> |

## Support

For issues with the progress system:
1. Check Firestore Console for user data
2. Verify security rules are set correctly
3. Check browser console for errors
4. Ensure user is authenticated
5. Try refreshing the page

## Summary

The user progress system now provides:
- ✅ Per-user progress tracking
- ✅ Cross-device synchronization
- ✅ Automatic migration from localStorage
- ✅ Secure Firestore storage
- ✅ Real-time progress updates
- ✅ Better user experience

All quiz progress, badges, and points are now tied to user accounts and persist across sessions and devices!
