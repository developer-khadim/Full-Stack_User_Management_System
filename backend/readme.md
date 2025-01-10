# User Management System Backend

A Node.js-based project featuring user registration, authentication, image and video management, and database connectivity using MongoDB.

## Features

### User Management

**Registration:** Users can register with the following details:
- First Name
- Last Name
- Email
- Username
- Password (hashed before saving to the database)
- Contact Information

**Authentication:**
- JSON Web Token (JWT) is used for secure authentication.
- Tokens are stored in HTTP-only cookies.

### Admin Management

**Admin Schema:**
- Name (First and Last)
- Email (unique)
- Password (hashed)
- Contact Information
- Profile Picture

### Image and Video Management

**Image Schema:**
- Fields for `imageUrl`, `public_Id` (Cloudinary), `uploadedAt`, `userId`, and an optional description.
- References the User schema.

**Video Schema:**
- Fields for `videoUrl`, `public_Id`, `uploadedAt`, `userId`, and an optional description.
- References the User schema.

### Database Connectivity

- Uses MongoDB Atlas for cloud database management.
- Connection established using Mongoose with an environment variable for the database URI.

### Middleware

**Password Hashing:**
- Pre-save middleware hashes passwords using bcrypt.

**Error Handling:**
- Handles validation errors and duplicate keys gracefully.

---

## Table of Contents

- [API Endpoints](#api-endpoints)
- [Utilities](#utilities)
- [Configuration](#configuration)
- [File Structure](#file-structure)
- [How to Run](#how-to-run)
- [Dependencies](#dependencies)
- [License](#license)

---

## API Endpoints

### User Routes

**Register a New User:**

```http
POST /user/register
```

Request:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "username": "johndoe",
  "password": "password123",
  "contact": "1234567890"
}
```

Response:

```json
{
  "message": "User registered successfully!",
  "user": {
    "id": "12345",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com"
  }
}
```

**Image Upload Test Endpoint:**

```http
GET /image
```

---

## Utilities

- **Token Generation:** Utility to generate JWT tokens with a 1-day expiration.
- **Validation:** Uses `express-validator` for request validation.

---

## Configuration

Set up the following environment variables in a `.env` file:

```env
PORT=5000
dbConnection=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
CORS_ORIGIN=<your-allowed-origin>
```

---

## File Structure

```
project-root
├── app.js
├── routes
│   └── user.router.js
├── models
│   ├── user.model.js
│   ├── admin.model.js
│   ├── image.model.js
│   └── video.model.js
├── utils
│   └── generateToken.js
├── config
│   └── dbConnection.js
├── public
│   └── (Static files)
└── README.md
```

---

## How to Run

### Clone the Repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

### Install Dependencies:

```bash
npm install
```

### Start the Server:

```bash
npm start
```

The server will run at `http://localhost:5000`.

---

## Dependencies

This project uses the following dependencies:

- **bcrypt**: For hashing passwords securely.
- **cookie-parser**: To parse cookies attached to the client request.
- **cors**: To enable Cross-Origin Resource Sharing.
- **dotenv**: To load environment variables from a `.env` file.
- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **express-validator**: For validating and sanitizing user inputs.
- **jsonwebtoken**: For creating and verifying JSON Web Tokens.
- **mongoose**: For MongoDB object modeling.
- **nodemailer**: To send emails from the application.
- **passport**: For authentication middleware.
- **passport-google-oauth20**: For Google OAuth 2.0 authentication.
- **validator**: For string validation and sanitization.

Install dependencies with:

```bash
npm install bcrypt cookie-parser cors dotenv express express-validator jsonwebtoken mongoose nodemailer passport passport-google-oauth20 validator
```

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.