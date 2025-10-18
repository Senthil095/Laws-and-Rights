# Feedback System with Excel Export

## Overview
The feedback system allows users to submit categorized feedback that is stored in Firestore and can be exported to Excel spreadsheets for analysis.

## Features

### 📝 **Feedback Categories**
1. **General Feedback** - General comments and suggestions
2. **Bug Report** - Report issues and bugs
3. **Feature Request** - Suggest new features
4. **Appreciation** - Thank you messages and positive feedback

### 🎯 **Key Capabilities**
- ✅ User-submitted feedback with categories
- ✅ Star rating system (1-5 stars)
- ✅ Automatic user info population (if logged in)
- ✅ Firestore storage with timestamps
- ✅ Admin dashboard for viewing feedback
- ✅ Excel export with separate sheets per category
- ✅ Real-time statistics and metrics

## File Structure

```
lib/
└── feedback-service.js     # Firestore feedback operations

app/
├── feedback/
│   └── page.jsx            # User feedback form
└── admin/
    └── feedback/
        └── page.jsx        # Admin dashboard with Excel export

components/
├── floating-feedback-button.jsx  # Floating feedback button
└── feedback-status.jsx            # Success confirmation page
```

## Database Structure (Firestore)

**Collection:** `feedback/{feedbackId}`

```javascript
{
  userId: "user123" | "anonymous",
  userName: "John Doe",
  userEmail: "john@example.com",
  category: "bug_report" | "feature_request" | "general" | "appreciation",
  subject: "Login button not working",
  message: "When I click the login button, nothing happens...",
  rating: 4,                    // 1-5 stars (optional)
  page: "/auth/login",          // Page where feedback was submitted
  status: "pending",            // "pending" | "reviewed" | "resolved"
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## Usage

### **For Users**

#### Submit Feedback

1. **Click feedback button** (green floating button on bottom-left)
2. **Fill out form:**
   - Name and Email (auto-filled if logged in)
   - Select category
   - Rate experience (1-5 stars)
   - Add subject and detailed message
3. **Submit** - Feedback saved to Firestore

#### Feedback Form URL
```
/feedback
```

### **For Admins**

#### View Feedback Dashboard

1. **Navigate to:** `/admin/feedback`
2. **View statistics:**
   - Total feedback count
   - Breakdown by category
   - Status distribution

3. **Filter feedback** by category
4. **Export to Excel** with one click

#### Admin Dashboard URL
```
/admin/feedback
```

## Excel Export

### **Export Format**

The exported Excel file contains multiple sheets:

#### **Summary Sheet**
```
Category              | Count
---------------------|------
General Feedback     | 15
Bug Reports          | 8
Feature Requests     | 12
Appreciation         | 5
---------------------|------
Total Feedback       | 40
---------------------|------
Pending              | 25
Reviewed             | 10
Resolved             | 5
```

#### **Category Sheets**
Each category gets its own sheet with columns:

| Date | User | Email | Subject | Message | Status | Rating |
|------|------|-------|---------|---------|--------|--------|
| 10/18/2025 | John | john@... | Bug in login | Details... | PENDING | 4/5 |

#### **File Naming**
```
Feedback_Report_2025-10-18.xlsx
```

### **Code Example - Export to Excel**

```javascript
import * as XLSX from 'xlsx'
import { getAllFeedback, prepareFeedbackByCategoryForExcel } from '@/lib/feedback-service'

// Get all feedback
const feedback = await getAllFeedback()

// Prepare categorized data
const categorizedData = prepareFeedbackByCategoryForExcel(feedback)

// Create workbook
const wb = XLSX.utils.book_new()

// Add sheets for each category
Object.entries(categorizedData).forEach(([categoryName, data]) => {
  const ws = XLSX.utils.json_to_sheet(data)
  XLSX.utils.book_append_sheet(wb, ws, categoryName)
})

// Download file
XLSX.writeFile(wb, 'Feedback_Report.xlsx')
```

## API Functions

### **Submit Feedback**
```javascript
import { submitFeedback, FEEDBACK_CATEGORIES } from '@/lib/feedback-service'

const result = await submitFeedback({
  userId: user?.uid || null,
  userName: "John Doe",
  userEmail: "john@example.com",
  category: FEEDBACK_CATEGORIES.BUG_REPORT,
  subject: "Login Issue",
  message: "Cannot login with Google",
  rating: 3,
  page: "/auth/login"
})

// Returns: { success: true, feedbackId: "abc123", message: "..." }
```

### **Get All Feedback**
```javascript
import { getAllFeedback } from '@/lib/feedback-service'

const feedback = await getAllFeedback()
// Returns: Array of feedback objects sorted by date
```

### **Get Feedback by Category**
```javascript
import { getFeedbackByCategory, FEEDBACK_CATEGORIES } from '@/lib/feedback-service'

const bugReports = await getFeedbackByCategory(FEEDBACK_CATEGORIES.BUG_REPORT)
```

### **Get Feedback Statistics**
```javascript
import { getFeedbackStats } from '@/lib/feedback-service'

const stats = await getFeedbackStats()
// Returns:
// {
//   total: 40,
//   byCategory: { bug_report: 8, feature_request: 12, ... },
//   byStatus: { pending: 25, reviewed: 10, resolved: 5 }
// }
```

## Firestore Security Rules

Add to your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Feedback collection
    match /feedback/{feedbackId} {
      // Anyone can create feedback
      allow create: if true;
      
      // Only authenticated users can read
      allow read: if request.auth != null;
      
      // Only admins can update/delete (add your admin check)
      allow update, delete: if request.auth != null && 
        request.auth.token.email in ['admin@example.com'];
    }
  }
}
```

**Production Security:** Replace the admin email check with proper role-based authentication using custom claims.

## Admin Authentication

### **Basic Setup (Current)**
Currently, any logged-in user can access `/admin/feedback`. 

### **Recommended Production Setup**

1. **Add admin role to Firebase users:**
```javascript
// Firebase Admin SDK
admin.auth().setCustomUserClaims(userId, { admin: true })
```

2. **Update security rules:**
```javascript
allow read, update, delete: if request.auth != null && 
  request.auth.token.admin == true;
```

3. **Check in component:**
```javascript
// In admin page
useEffect(() => {
  const checkAdmin = async () => {
    const token = await user.getIdTokenResult()
    if (!token.claims.admin) {
      router.push('/')
    }
  }
  checkAdmin()
}, [user])
```

## Statistics Dashboard

The admin dashboard shows:

### **Overview Cards**
- 📊 **Total Feedback** - All feedback count
- 🐛 **Bug Reports** - Count of bug reports
- 💡 **Feature Requests** - Count of feature requests  
- ❤️ **Appreciation** - Count of thank you messages

### **Filters**
- View all feedback
- Filter by category
- Sort by date (newest first)

### **Feedback Details**
Each feedback shows:
- Category badge with icon
- Star rating (if provided)
- Submission date
- Subject and message
- User name and email

## Integration

### **Add Feedback Button to Page**

Already included globally via `FloatingFeedbackButton` in `app/layout.jsx`.

To add manually:
```javascript
import { FloatingFeedbackButton } from '@/components/floating-feedback-button'

<FloatingFeedbackButton />
```

### **Custom Feedback Form**

```javascript
import { submitFeedback, FEEDBACK_CATEGORIES } from '@/lib/feedback-service'

const handleSubmit = async () => {
  const result = await submitFeedback({
    userId: user?.uid,
    userName: "User Name",
    userEmail: "email@example.com",
    category: FEEDBACK_CATEGORIES.BUG_REPORT,
    subject: "Issue title",
    message: "Detailed description",
    rating: 4,
    page: window.location.pathname
  })
  
  if (result.success) {
    console.log('Feedback submitted!')
  }
}
```

## Testing

### **Test Feedback Submission**
1. Go to `/feedback`
2. Fill out form with test data
3. Submit
4. Check Firestore Console - should see new document

### **Test Admin Dashboard**
1. Go to `/admin/feedback`
2. Should see submitted feedback
3. Try filtering by category
4. Click "Export to Excel"
5. Open downloaded file - should have category sheets

### **Test Excel Export**
1. Submit feedback in multiple categories
2. Go to admin dashboard
3. Click "Export to Excel"
4. Verify:
   - ✅ Summary sheet with stats
   - ✅ Separate sheet for each category
   - ✅ Correct data in each sheet
   - ✅ Proper formatting

## Analyzing Feedback

### **View Trends**
- Track bug reports over time
- Identify most requested features
- Monitor user satisfaction via ratings
- Review appreciation messages

### **Export for Analysis**
Export to Excel and use:
- **Pivot tables** for trend analysis
- **Charts** for visualization
- **Filters** for category breakdown
- **Formulas** for metrics calculation

### **Sample Metrics**
```
Average Rating = SUM(ratings) / COUNT(ratings)
Bug Resolution Rate = Resolved Bugs / Total Bugs
Top Feature Requests = COUNT by subject (feature category)
Response Time = Time between submission and status change
```

## Customization

### **Add New Categories**

1. **Update `feedback-service.js`:**
```javascript
export const FEEDBACK_CATEGORIES = {
  // ...existing
  SUGGESTION: 'suggestion'
}

export const FEEDBACK_CATEGORY_LABELS = {
  // ...existing
  [FEEDBACK_CATEGORIES.SUGGESTION]: 'Suggestion'
}
```

2. **Update feedback form:**
Add new radio option in `app/feedback/page.jsx`

3. **Update admin dashboard:**
Add new tab and stats card

### **Add Status Management**

Update admin dashboard to allow status changes:
```javascript
import { doc, updateDoc } from 'firebase/firestore'

const updateStatus = async (feedbackId, newStatus) => {
  await updateDoc(doc(db, 'feedback', feedbackId), {
    status: newStatus,
    updatedAt: new Date()
  })
}
```

### **Add Email Notifications**

Use Firebase Cloud Functions to send emails when feedback is submitted:
```javascript
exports.sendFeedbackNotification = functions.firestore
  .document('feedback/{feedbackId}')
  .onCreate(async (snap, context) => {
    const feedback = snap.data()
    // Send email to admin
  })
```

## Troubleshooting

### **Feedback not saving**
- Check Firestore is enabled
- Verify security rules allow create
- Check browser console for errors
- Ensure user has internet connection

### **Excel export not working**
- Verify `xlsx` package is installed: `npm install xlsx`
- Check if feedback data exists
- Look for console errors during export

### **Admin page shows no feedback**
- Check Firestore security rules
- Verify user is authenticated
- Check if feedback collection has data
- Look for console errors

## Future Enhancements

- [ ] Email notifications for new feedback
- [ ] Status update workflow (pending → reviewed → resolved)
- [ ] Response system (admin can reply to feedback)
- [ ] Attachment support (screenshots for bug reports)
- [ ] Upvoting for feature requests
- [ ] Search and advanced filters
- [ ] Charts and analytics dashboard
- [ ] Automated categorization with AI
- [ ] Integration with issue tracking systems

## Summary

✅ **Categorized feedback collection** (4 categories)  
✅ **Firestore storage** with timestamps  
✅ **Excel export** with category sheets  
✅ **Admin dashboard** with statistics  
✅ **User-friendly forms** with ratings  
✅ **Real-time data** updates  
✅ **Production-ready** structure  

Your feedback system is now ready to collect, organize, and export user feedback to Excel! 📊✨
