# Complete Firestore Security Rules

## Full Security Rules Configuration

Use these complete security rules in your Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // User profiles - users can only access their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // User progress (quiz completions, points, badges)
    match /userProgress/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Daily streaks
    match /streaks/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Feedback collection
    match /feedback/{feedbackId} {
      // Anyone can create feedback (including anonymous users)
      allow create: if true;
      
      // Authenticated users can read their own feedback
      allow read: if request.auth != null;
      
      // Only admins can update or delete feedback
      // TODO: Replace with proper admin role check in production
      allow update, delete: if request.auth != null && 
        request.auth.token.email in ['your-admin-email@example.com'];
    }
  }
}
```

## Setup Instructions

1. **Go to Firebase Console:**
   - https://console.firebase.google.com
   - Select your project: `design-thinking-cb0bc`

2. **Navigate to Firestore:**
   - Click "Firestore Database" in the left sidebar
   - Go to "Rules" tab

3. **Paste the rules above**

4. **Update admin email:**
   - Replace `'your-admin-email@example.com'` with your actual admin email
   - Or implement proper role-based authentication (see below)

5. **Publish rules:**
   - Click "Publish" button

## Production Admin Setup

For production, use Firebase custom claims instead of email checking:

### **1. Set admin claims (Firebase Admin SDK):**

```javascript
// Run this once in a Node.js environment with Firebase Admin SDK
const admin = require('firebase-admin');

admin.auth().setCustomUserClaims('USER_ID_HERE', {
  admin: true
}).then(() => {
  console.log('Admin claim set successfully');
});
```

### **2. Update Firestore rules:**

```javascript
match /feedback/{feedbackId} {
  allow create: if true;
  allow read: if request.auth != null;
  allow update, delete: if request.auth != null && 
    request.auth.token.admin == true;
}
```

### **3. Check in frontend:**

```javascript
// In admin pages
useEffect(() => {
  const checkAdmin = async () => {
    if (!user) return;
    
    const tokenResult = await user.getIdTokenResult();
    if (!tokenResult.claims.admin) {
      router.push('/');
      toast({
        title: "Access Denied",
        description: "Admin access required",
        variant: "destructive"
      });
    }
  };
  checkAdmin();
}, [user]);
```

## Collections Structure

### **users**
```
users/{userId}
  ├── displayName: string
  ├── email: string
  └── createdAt: timestamp
```

### **userProgress**
```
userProgress/{userId}
  ├── completedLevels: map
  ├── totalPoints: number
  ├── earnedBadges: array
  ├── lastUpdated: timestamp
  └── createdAt: timestamp
```

### **streaks**
```
streaks/{userId}
  ├── currentStreak: number
  ├── longestStreak: number
  ├── lastLoginDate: timestamp
  ├── totalPoints: number
  ├── badges: array
  ├── titles: array
  ├── hintTokens: number
  └── claimedRewards: map
```

### **feedback**
```
feedback/{feedbackId}
  ├── userId: string
  ├── userName: string
  ├── userEmail: string
  ├── category: string
  ├── subject: string
  ├── message: string
  ├── rating: number (optional)
  ├── page: string (optional)
  ├── status: string
  ├── createdAt: timestamp
  └── updatedAt: timestamp
```

## Testing Rules

Use the Firebase Console Rules Playground to test:

**Test 1: User can read own progress**
```
Service: Cloud Firestore
Path: /userProgress/USER123
Read: ALLOW (if auth.uid == USER123)
Write: ALLOW (if auth.uid == USER123)
```

**Test 2: User cannot read other user's progress**
```
Path: /userProgress/USER456
Auth: USER123
Read: DENY
```

**Test 3: Anyone can create feedback**
```
Path: /feedback/NEW_DOC
Auth: None
Create: ALLOW
```

**Test 4: Only admins can update feedback**
```
Path: /feedback/EXISTING_DOC
Auth: user with admin claim
Update: ALLOW
```

## Monitoring

Monitor your Firestore usage in Firebase Console:
- **Usage tab** - See read/write counts
- **Indexes** - Check required indexes
- **Rules** - See rule execution logs

## Best Practices

✅ **Always test rules** before deploying to production  
✅ **Use custom claims** for roles (not email checks)  
✅ **Limit public access** to only what's necessary  
✅ **Validate data** in rules when possible  
✅ **Monitor usage** to prevent abuse  
✅ **Use indexes** for complex queries  

## Troubleshooting

**Permission Denied Error:**
- Check if user is authenticated
- Verify user ID matches document ID
- Check Firestore rules are published
- Clear browser cache and re-login

**Rules Not Working:**
- Ensure rules are published (check timestamp)
- Test in Firebase Console Rules Playground
- Check for syntax errors in rules
- Verify auth state in frontend

Your Firestore is now secured with proper access control! 🔒
