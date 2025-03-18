# Smart Village Revolution Admin Portal Documentation

## 1. Authentication System
### Login (`/auth/login`)
- Split screen design with image and login form
- Features:
  - ID Number & Password authentication
  - Custom CAPTCHA implementation
  - Password visibility toggle
  - Remember me functionality
  - Forgot password link
- Styling: Green theme with responsive design

### Password Management
#### Forgot Password (`/auth/forgot-password`)
- Email-based recovery system
- CAPTCHA verification
- Email template in `/template/mail.html`
- Toast notifications for user feedback

#### Reset Password (`/auth/reset-password`)
- Token-based verification
- New password setup
- Password strength validation
- Confirmation required

## 2. Dashboard Layout
### Navigation (`/dashboard/components/nav`)
- Top navigation bar
- Features:
  - Logo and title
  - User info display
  - Logout button
- Styling: Green background with white text

### Admin Management (`/dashboard/components/manage-admins`)
#### Add Admin Component
- Form fields:
  - Name
  - ID Number
  - Email
  - Password
  - Role selection (admin/superadmin)
- API integration with `/api/dashboard/add_admin`
- Responsive form layout
- Loading states and error handling

### Profile Management (`/dashboard/components/profile`)
- Two-column layout
- Features:
  - Personal information display
  - Password change functionality
  - Form validation
  - Loading states

## 3. Common Components
### Toast Notifications
- Position: top-right
- Types: success, error, loading
- Used across all components for user feedback

### Form Elements
- Consistent styling:
  - Input fields with labels
  - Focus states
  - Error states
  - Loading states
- Password fields with visibility toggles

## 4. Styling Patterns
### Color Scheme
- Primary: Green (#2c5530)
- Background: Light green (#f0f7f4)
- Accent: Sea green (#2e8b57)
- Text: Dark green (#2c5530)
- Error: Red (#ff4444)

### Layout Patterns
- Flex-box based layouts
- Responsive breakpoints:
  - Desktop: > 1024px
  - Tablet: 768px - 1024px
  - Mobile: < 768px
- Consistent padding and margins
- Box shadows for depth

### Animation & Transitions
- Form element transitions
- Button hover effects
- Loading state animations
- Toast notification animations

## 5. Security Features
- CAPTCHA implementation
- Password hashing
- Token-based authentication
- Session management
- Input validation and sanitization

## 6. API Integration
### Authentication Endpoints
- `/api/auth/login`
- `/api/auth/forgot-password`
- `/api/auth/reset-password`

### Admin Management Endpoints
- `/api/dashboard/add_admin`
- `/api/dashboard/manage-admins`
- `/api/dashboard/profile`

## 7. Context & State Management
### AuthContext
- User authentication state
- Login/Logout functions
- User role management
- Session persistence

## 8. File Structure
```
src/
├── app/
│   ├── (pages)/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   ├── nav/
│   │   │   │   ├── profile/
│   │   │   │   └── manage-admins/
│   │   └── info/
│   ├── assets/
│   ├── contexts/
│   └── template/
```

## 9. Dependencies
- Next.js
- React Hot Toast
- React Context API
- Custom CSS Modules

## 10. Best Practices Implemented
- Component reusability
- Consistent error handling
- Responsive design
- Loading states
- User feedback
- Form validation
- Security measures 