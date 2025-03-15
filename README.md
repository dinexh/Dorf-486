# Smart Village Revolution Portal

A comprehensive admin portal for managing Smart Village Revolution initiatives at KLEF.

## Features

### Authentication
- Secure login system with role-based access (Superadmin/Admin)
- Enhanced security with alphanumeric CAPTCHA
- Password reset functionality
- Session management with JWT tokens

### Dashboard Features
- Role-specific dashboards for Superadmin and Admin
- Activity management
- Gallery management
- News updates
- Awards tracking
- Focus areas management
- Areas of work management

### Security Features
- HTTP-only cookies
- Secure password hashing
- Protected API routes
- Input validation and sanitization

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
- npm/yarn

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd svr-klef
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file with:
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

4. Set up the database
```bash
# Run the SQL script from
src/config/tables.sql
```

5. Run the development server
```bash
npm run dev
```

### Default Admin Credentials
```

## Project Structure

```
src/
├── app/
│   ├── (pages)/
│   │   ├── auth/
│   │   └── dashboard/
│   ├── api/
│   │   ├── auth/
│   │   └── dashboard/
│   └── template/
├── components/
├── contexts/
├── lib/
└── config/
```

## API Routes

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/check` - Check auth status
- `POST /api/auth/forgot-password` - Password reset request

### Dashboard
- Various API endpoints for managing content

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

Copyright © 2025. All rights reserved by KLEF - SAC

## Developers

Developed by Dinesh Korukonda of ZeroOne CodeClub of KLEF SAC

## Support

For support, email [contact-email] or join our Slack channel.