# Admin Access Credentials

## Admin Login

To access the admin panel and view/export feedback:

### **Default Admin Credentials**

```
Admin ID: 63687195116
Password: Admin@123
```

## Admin Routes

### **Login Page**
```
/admin/login
```

### **Feedback Dashboard** (Protected)
```
/admin/feedback
```

### **Admin Root** (Auto-redirects)
```
/admin
```

## How to Access

1. **Navigate to login page:**
   ```
   http://localhost:3002/admin/login
   ```

2. **Enter credentials:**
   - Admin ID: `63687195116`
   - Password: `Admin@123`

3. **Click "Login to Admin Panel"**

4. **You'll be redirected to:**
   ```
   /admin/feedback
   ```

## Session Management

- **Session Duration:** 24 hours
- **Storage:** localStorage (`admin_session`)
- **Auto-logout:** After 24 hours
- **Manual logout:** Click "Logout" button in admin dashboard

## Security Features

✅ **Protected Routes:** Admin pages require authentication  
✅ **Session Expiry:** Auto-logout after 24 hours  
✅ **Credential Validation:** Server-side credential check  
✅ **Redirect Protection:** Unauthorized access redirects to login  

## Changing Admin Credentials

To change the admin credentials, edit `lib/admin-auth.js`:

```javascript
const ADMIN_CREDENTIALS = {
  id: 'YOUR_NEW_ID',
  password: 'YOUR_NEW_PASSWORD'
}
```

## Production Recommendations

For production deployment:

### **1. Use Environment Variables**

```javascript
// lib/admin-auth.js
const ADMIN_CREDENTIALS = {
  id: process.env.NEXT_PUBLIC_ADMIN_ID,
  password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD
}
```

### **2. Hash Passwords**

Install bcrypt:
```bash
npm install bcryptjs
```

Update authentication:
```javascript
import bcrypt from 'bcryptjs'

// Hash password (do this once)
const hashedPassword = await bcrypt.hash('admin123', 10)

// Verify
export async function verifyAdminCredentials(id, password) {
  if (id !== ADMIN_CREDENTIALS.id) return false
  return await bcrypt.compare(password, ADMIN_CREDENTIALS.hashedPassword)
}
```

### **3. Use Database for Admin Users**

Store admin users in Firestore:
```javascript
// admins collection
admins/{adminId}
  ├── id: "63697195116"
  ├── passwordHash: "..." 
  ├── name: "Admin Name"
  └── role: "super_admin"
```

### **4. Add 2FA (Two-Factor Authentication)**

Consider adding:
- Email verification codes
- SMS OTP
- Google Authenticator
- Biometric authentication

### **5. Rate Limiting**

Prevent brute force attacks:
- Limit login attempts
- Add CAPTCHA after failed attempts
- Block IP after multiple failures

## Troubleshooting

### **Can't Login**
- Check credentials are correct
- Clear browser cache and localStorage
- Check console for errors

### **Session Expired**
- Login again at `/admin/login`
- Session expires after 24 hours

### **Redirected to Login**
- Session may have expired
- Clear localStorage and re-login
- Check browser console for errors

## Access Control

Current implementation:
- ✅ Simple ID/Password authentication
- ✅ Session-based access control
- ✅ 24-hour session expiry
- ✅ Manual logout option

Future enhancements:
- [ ] Role-based access (Admin, Moderator, Viewer)
- [ ] Multiple admin accounts
- [ ] Activity logging
- [ ] Password reset functionality
- [ ] Email notifications on login

## Demo Access

These credentials are for **demo/development purposes only**.

For production:
1. Change the credentials
2. Use environment variables
3. Hash passwords
4. Implement proper authentication system
5. Add audit logging

---

**IMPORTANT:** Never commit real admin credentials to version control!
Use environment variables and secret management tools.
