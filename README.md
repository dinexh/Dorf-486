# Smart Village Revolution Portal

A comprehensive admin portal designed to manage Smart Village Revolution initiatives at KLEF.

## Features

### Authentication
- Secure login with role-based access for Superadmin and Admin.
- Enhanced security using alphanumeric CAPTCHA.
- Password reset functionality.
- Session management with JWT tokens.

### Dashboard
- Role-specific dashboards for Superadmin and Admin.
- Management of activities, gallery, news, awards, focus areas, and areas of work.

### Security
- HTTP-only cookies for secure sessions.
- Secure password hashing.
- Protected API routes with input validation and sanitization.

## Tech Stack

- **Frontend**: Next.js 14
- **Backend**: Next.js API Routes
- **Database**: MySQL
- **Authentication**: JWT
- **Styling**: Custom CSS
- **Icons**: React Icons
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MySQL
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone [repository-url]
   cd svr-klef
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file with the following:
   ```env
   # Database
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=svr_klef

   # JWT
   JWT_SECRET=your_jwt_secret

   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up the database:**
   ```bash
   # Run the SQL script from
   src/config/tables.sql
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

### Default Admin Credentials
- [Provide default credentials here if applicable]



## API Routes

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/check` - Check authentication status
- `POST /api/auth/forgot-password` - Password reset request

### Dashboard
- Various API endpoints for managing content

## Contributing

1. Fork the repository.
2. Create your feature branch.
3. Commit your changes.
4. Push to the branch.
5. Create a new Pull Request.

## License

© 2025 KLEF - SAC. All rights reserved.

## Developers

Developed by Dinesh Korukonda of ZeroOne CodeClub at KLEF SAC.

## Support

For support, contact [support email or contact information].