# Smart Village Revolution Portal Documentation

## System Architecture

### Frontend
- Built with Next.js 14
- Client-side state management using React Context
- Protected routes with middleware
- Responsive custom CSS styling
- Toast notifications for user feedback

### Backend
- Next.js API Routes
- MySQL Database
- JWT Authentication
- HTTP-only cookies for security

## Authentication System

### API Routes

1. `/api/auth/login`
   - Method: POST
   - Purpose: User authentication
   - Payload: { idNumber, password, captcha }
   - Response: JWT token in HTTP-only cookie

2. `/api/auth/logout`
   - Method: POST
   - Purpose: User logout
   - Action: Clears JWT cookie

3. `/api/auth/check`
   - Method: GET
   - Purpose: Verify authentication status
   - Returns: User data if authenticated

4. `/api/auth/forgot-password`
   - Method: POST
   - Purpose: Password reset initiation
   - Payload: { email }

5. `/api/auth/reset-password`
   - Method: POST
   - Purpose: Password reset completion
   - Payload: { token, password }

## Dashboard APIs

### Admin Management

1. `/api/dashboard/admins`
   - GET: Fetch all admins
   - POST: Add new admin
   - PUT: Update admin status
   - DELETE: Remove admin

2. `/api/dashboard/change-password`
   - POST: Change user password
   - Payload: { oldPassword, newPassword }

### Content Management

1. `/api/dashboard/focusd`
   - GET: Fetch focus areas
   - POST: Add new focus area
   - PUT: Update focus area
   - DELETE: Remove focus area

2. `/api/dashboard/activities`
   - GET: List all activities
   - POST: Add new activity
   - PUT: Update activity
   - DELETE: Remove activity

3. `/api/dashboard/gallery`
   - GET: Fetch gallery images
   - POST: Add new image
   - DELETE: Remove image

4. `/api/dashboard/awards`
   - GET: List awards
   - POST: Add new award
   - PUT: Update award
   - DELETE: Remove award

## Database Structure

### Tables

1. User
   - id (PK)
   - name
   - idNumber
   - email
   - password
   - role
   - status

2. FocusAreas
   - id (PK)
   - domain_id (FK)
   - description
   - imageLink

3. Activities
   - id (PK)
   - name
   - date
   - domain_id (FK)
   - studentsParticipated
   - reportLink

4. Gallery
   - id (PK)
   - imageLink
   - domain_id (FK)

5. Awards
   - id (PK)
   - image_link
   - description
   - award_date

6. Domain
   - id (PK)
   - name

## Security Features

1. Authentication
   - JWT tokens with expiration
   - HTTP-only cookies
   - CAPTCHA verification

2. Authorization
   - Role-based access control (Admin/Superadmin)
   - Protected API routes
   - Middleware validation

3. Data Protection
   - Password hashing
   - Input validation
   - SQL injection protection
   - XSS prevention

## Frontend Routes

1. Public Routes
   - `/` - Homepage
   - `/auth/login` - Login page
   - `/auth/forgot-password` - Password reset
   - `/activities` - Public activities view

2. Protected Routes
   - `/dashboard` - Admin dashboard
   - `/dashboard/profile` - User profile
   - `/dashboard/manage-admins` - Admin management
   - `/dashboard/activities` - Activities management
   - `/dashboard/focus` - Focus areas management
   - `/dashboard/gallery` - Gallery management
   - `/dashboard/awards` - Awards management

## Error Handling

1. API Errors
   - Consistent error response format
   - Appropriate HTTP status codes
   - Detailed error messages in development

2. Client-side Errors
   - Form validation
   - Loading states
   - Error boundaries
   - Toast notifications

## Environment Variables

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=svr_klef

# Authentication
JWT_SECRET=your_jwt_secret

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Deployment

The application is configured for deployment on Vercel with:
- Automatic builds and deployments
- Environment variable management
- SSL/TLS encryption
- CDN integration
