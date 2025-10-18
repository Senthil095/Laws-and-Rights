# Daily Streak & Reward System

## Overview
The Daily Streak System rewards users for consistent daily logins and learning. Users can earn up to 100 days of rewards including points, badges, titles, hint tokens, and cosmetic unlocks.

## Features

### 🔥 Daily Streak Tracking
- Automatically tracks when users log in each day
- Continues streak if user logs in on consecutive days
- Resets to day 1 if user misses a day
- Tracks longest streak achieved

### 🎁 Reward Types

#### 1. **Points**
- Earned at various milestones
- Separate from quiz points
- Displayed in navbar and achievements page
- Range: 5-500 points per reward

#### 2. **Badges** (17 Total)
- Day 3: 🏅 "Curious Citizen"
- Day 7: 🧭 "Law Explorer"
- Day 14: 🕊️ "Voice of Rights"
- Day 20: 🏆 "Justice Seeker"
- Day 28: 🕵️ "Legal Detective"
- Day 30: ✨ "Guardian of Rights" (Golden)
- Day 36: 🏅 "Law Challenger"
- Day 45: 🧠 "Legal Scholar"
- Day 50: 💎 "Justice Ambassador"
- Day 55: 🧭 "Equality Guardian"
- Day 60: 🏅 "Law Champion"
- Day 70: 🌟 "Protector of Rights"
- Day 75: 🏆 "People's Defender" (Legend)
- Day 80: 💎 "Law Master"
- Day 90: ✨ "Champion of Constitution"
- Day 99: 💎 "Supreme Learner"
- Day 100: 👑 "Guardian of Justice" (Ultimate)

#### 3. **Titles** (6 Total)
- Day 18: ⚖️ "Law Learner"
- Day 40: "Rights Defender"
- Day 65: 🧠 "Justice Enthusiast"
- Day 85: "Voice of Justice"
- Day 95: 🧠 "Justice Legend"
- Users can change their active title

#### 4. **Hint Tokens** (8 Total)
- Days: 10, 21, 31, 41, 51, 61, 71, 81
- Used during quizzes for free hints
- Tracked and displayed in achievements

#### 5. **Cosmetic Unlocks**
- Day 15: New Stickman Color
- Day 34: Quiz Theme Unlock
- Day 43: Background Theme
- Day 57: Avatar Accessory
- Day 67: Quiz Theme Variant
- Day 77: Badge Style
- Day 84: Profile Frame
- Day 94: Golden Avatar Theme

#### 6. **Special Content**
- Constitutional Quotes (Days: 5, 64, 73, 97)
- Legal Facts (Days: 24, 39, 54, 79, 88)
- XP Boost multipliers (Days: 7, 48)

## File Structure

```
lib/
├── streak-rewards.js        # Reward configuration and utilities
├── streak-service.js        # Firestore operations for streaks
└── firebase.js              # Firebase config (includes Firestore)

contexts/
└── StreakContext.js         # React context for streak state management

components/
├── streak-display.jsx       # Streak counter display component
└── reward-modal.jsx         # Modal for showing daily rewards
```

## Implementation Details

### Database Structure (Firestore)

Collection: `streaks/{userId}`

```javascript
{
  currentStreak: 15,           // Current consecutive days
  longestStreak: 20,           // Best streak ever
  lastLoginDate: "2025-10-18T08:00:00.000Z",
  totalPoints: 150,            // Total streak points earned
  badges: [                    // Array of earned badges
    {
      name: "Curious Citizen",
      earnedOn: "2025-10-03T...",
      day: 3,
      golden: false
    }
  ],
  titles: [                    // Array of earned titles
    {
      name: "Law Learner",
      earnedOn: "2025-10-18T...",
      day: 18
    }
  ],
  currentTitle: "Law Learner", // Active title
  hintTokens: 2,              // Available hint tokens
  cosmetics: [],              // Unlocked cosmetics
  themes: [],                 // Unlocked themes
  claimedRewards: {           // Track claimed daily rewards
    "1": true,
    "2": true,
    // ...
  },
  streakHistory: [            // Login history
    {
      day: 1,
      date: "2025-10-01T...",
      rewardClaimed: true
    }
  ],
  createdAt: "2025-10-01T..."
}
```

### Key Functions

#### `updateStreakOnLogin(userId)`
- Called automatically when user logs in
- Checks if already logged in today
- Continues or resets streak
- Awards daily reward
- Returns reward info for modal display

#### `useHintToken(userId)`
- Deducts one hint token
- Returns success status

#### `awardPoints(userId, points, source)`
- Add points from other sources (quizzes)
- Updates total points

#### `changeActiveTitle(userId, titleName)`
- Change displayed title
- Must be unlocked first

## UI Components

### StreakDisplay
**Location**: Navbar and Achievements page

**Props**:
- `compact`: boolean (default: false) - Compact mode for navbar

**Features**:
- Shows current streak with fire icon
- Displays total points
- Shows longest streak (full mode)
- Displays badges, hints, titles count (full mode)
- Shows current active title

### RewardModal
**Location**: Global (in layout.jsx)

**Features**:
- Animated entrance with confetti for milestones
- Shows reward details
- Displays constitutional quotes if applicable
- Displays legal facts if applicable
- Auto-triggers on daily login
- Can be closed by user

## Integration

### 1. Setup Firestore
```bash
# Enable Firestore in Firebase Console
# Set security rules (see main README)
```

### 2. Install Dependencies
```bash
npm install react-confetti
```

### 3. Provider Setup
The `StreakProvider` wraps the entire app in `app/layout.jsx`:

```jsx
<AuthProvider>
  <StreakProvider>
    {/* App content */}
    <RewardModal />
  </StreakProvider>
</AuthProvider>
```

### 4. Using in Components

```jsx
import { useStreak } from '@/contexts/StreakContext'

function MyComponent() {
  const { 
    streakData,        // Current streak data
    loading,           // Loading state
    useHintToken,      // Function to use hint
    awardPoints,       // Function to award points
    changeActiveTitle  // Function to change title
  } = useStreak()
  
  // Access streak data
  console.log(streakData.currentStreak)
  console.log(streakData.totalPoints)
  console.log(streakData.badges)
}
```

## Milestone Days

Special animations and celebrations on:
- **Day 7**: First week
- **Day 14**: Two weeks
- **Day 20**: 20-day milestone
- **Day 30**: One month 🎉
- **Day 50**: Halfway celebration 🎉
- **Day 60**: 60 days
- **Day 70**: 10 weeks
- **Day 75**: Legend status 🔥
- **Day 80**: Law Master
- **Day 90**: 3-month achievement 🇮🇳
- **Day 100**: Ultimate completion 👑✨

## Security Rules

Add to Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Streak data - users can only access their own
    match /streaks/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Future Enhancements

1. **Leaderboard**: Show top streak holders
2. **Weekly Challenges**: Additional rewards for completing weekly goals
3. **Streak Recovery**: Allow one "freeze" per month to recover lost streak
4. **Social Sharing**: Share milestone achievements
5. **Custom Themes**: Use unlocked themes in quiz interface
6. **Avatar System**: Use unlocked stickman colors and accessories
7. **Title Display**: Show titles in comments/forums (if added)
8. **Hint Token Usage**: Integrate with quiz system

## Testing

### Test Daily Login
1. Sign up with new account
2. Check navbar - should show streak = 1
3. Reward modal should appear with Day 1 reward
4. Check achievements page - streak display visible

### Test Streak Continuation
1. Update `lastLoginDate` in Firestore to yesterday
2. Refresh page or re-login
3. Streak should increase to 2
4. Day 2 reward should appear

### Test Streak Reset
1. Update `lastLoginDate` in Firestore to 3+ days ago
2. Refresh page or re-login
3. Streak should reset to 1
4. Day 1 reward should appear again

## Support

For issues or questions about the streak system:
1. Check Firestore rules are properly set
2. Verify user is authenticated
3. Check browser console for errors
4. Ensure Firestore is enabled in Firebase Console
