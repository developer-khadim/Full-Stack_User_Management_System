# User Management System Backend

A Node.js-based project featuring user registration, authentication, image and video management, and database connectivity using MongoDB.

## Features

### User Management

- **Registration**: Users can register with the following details:
  - First Name
  - Last Name
  - Email
  - Username
  - Password (hashed before saving to the database)
  - Contact Information
- **Authentication**:
  - JSON Web Token (JWT) is used for secure authentication.
  - Tokens are stored in HTTP-only cookies.

### Admin Management

- Separate admin schema with:
  - Name (First and Last)
  - Email (unique)
  - Password (hashed)
  - Contact Information
  - Profile Picture

### Image and Video Management

- **Image Schema**:
  - Fields for `imageUrl`, `public_Id` (Cloudinary), `uploadedAt`, `userId`, and an optional `description`.
  - References the User schema.
- **Video Schema**:
  - Fields for `videoUrl`, `public_id`, `uploadedAt`, `userId`, and an optional `description`.
  - References the User schema.

### Database Connectivity

- Uses MongoDB Atlas for cloud database management.
- Connection established using Mongoose with environment variable for database URI.

### Middleware

- **Password Hashing**:
  - Pre-save middleware hashes passwords using bcrypt.
- **Error Handling**:
  - Handles validation errors and duplicate keys gracefully.

### API Endpoints

#### User Routes

- **POST /user/register**: Register a new user.
- **GET /image**: Test endpoint for creating an image document.

### Utilities

- **Token Generation**: Utility to generate JWT tokens with a 1-day expiration.
- **Validation**: Uses `express-validator` for request validation.

### Configuration

- **Environment Variables**:
  - `PORT`: Port for server.
  - `dbConnection`: MongoDB Atlas connection string.
  - `JWT_SECRET`: Secret key for signing JWTs.
  - `CORS_ORIGIN`: Allowed origin for CORS.
- **CORS**: Configured to allow requests from the specified origin.

### File Structure

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

## How to Run

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the project root and add the following:

   ```env
   PORT=5000
   dbConnection=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   CORS_ORIGIN=<your-allowed-origin>
   ```

4. **Start the Server**:

   ```bash
   npm start
   ```

   The server will run at `http://localhost:5000`.

## Dependencies

- `express`
- `mongoose`
- `bcrypt`
- `jsonwebtoken`
- `express-validator`
- `cors`
- `cookie-parser`
- `dotenv`

## License

This project is licensed under the MIT License.

