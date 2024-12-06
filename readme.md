# User Authentication System - Backend Assignment - BrightCHAMPS

## Description
A user authentication system built with Node.js, Express, and MongoDB.

## Features
- User registration
- User login with JWT authentication
- Password reset functionality
- Secure error handling
- Code Modularity

## Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- bcrypt

## Error Handling
The system includes error handling for:
- Validation errors
- Authentication errors
- Database errors
- Server errors


## Security Features
- Password hashing using bcrypt
- JWT based authentication
- Input validation and sanitization
- Error handling middleware
- MongoDB injection prevention
- CORS enabled

## API Endpoints

```bash
# Register user
 /api/auth/register
 body: { fullName, emailAddress, userPassword }
 
# Login User
/api/auth/login
body: { emailAddress, userPassword }

#get User
/api/auth/me
headers: authorization with Bearer

#reset Password
/api/auth/reset-password
body: { emailAddress, oldPassword, newPassword }

```

## Running the Project
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Author
Alok Kumar