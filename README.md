# Banking App

A simple banking/payment backend API built with Node.js, Express, and MongoDB.

## Features

- User signup, signin, and update
- JWT-based authentication
- Account balance retrieval
- Money transfer between accounts
- Input validation with Zod
- MongoDB with Mongoose

## Project Structure

```
.
├── .gitignore
├── package.json
├── README.md
├── backend/
│   ├── .env
│   ├── index.js
│   ├── Db/
│   │   └── Db.js
│   ├── Lib/
│   │   └── Transactions.js
│   ├── Middlewares/
│   │   └── user.middleware.js
│   ├── Models/
│   │   └── models.js
│   ├── Routes/
│   │   ├── account.routes.js
│   │   ├── index.js
│   │   └── user.routes.js
│   └── Types/
│       └── user.types.js
└── frontend/
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:

   ```sh
   git clone <your-repo-url>
   cd Payment-Project
   npm install
   ```

2. Create a `.env` file in the `backend/` directory with the following variables:

   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

### Running the Server

```sh
cd backend
node index.js
```

The server will start on the port specified in `.env` (default: 3000).

## API Endpoints

All endpoints are prefixed with `/api/v1`.

### User

- `POST /api/v1/user/signup`  
  Register a new user.  
  **Body:**  
  ```json
  {
    "username": "string",
    "password": "string",
    "firstName": "string",
    "lastName": "string"
  }
  ```
  **Returns:** JWT token

- `POST /api/v1/user/signin`  
  Login and receive a JWT token.  
  **Body:**  
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
  **Returns:** JWT token

- `PUT /api/v1/user/update`  
  Update user details (requires JWT).  
  **Body:**  
  ```json
  {
    "username": "string (optional)",
    "password": "string (optional)",
    "firstName": "string (optional)",
    "lastName": "string (optional)"
  }
  ```
  **Returns:** `{ "message": "User updated successfully" }`

- `GET /api/v1/user/bulk?filter=...`  
  Search users by name.  
  **Returns:**  
  ```json
  {
    "user": [
      {
        "username": "string",
        "firstName": "string",
        "lastName": "string",
        "_id": "string"
      }
    ]
  }
  ```

- `GET /api/v1/user/me`  
  Get current user's profile and account info (requires JWT).  
  **Returns:**  
  ```json
  {
    "user": {
      "_id": "string",
      "username": "string",
      "firstName": "string",
      "lastName": "string"
    },
    "account": {
      "_id": "string",
      "userId": "string",
      "balance": number,
      "__v": 0
    }
  }
  ```

### Account

- `GET /api/v1/account/balance`  
  Get current user's account balance (requires JWT).

- `POST /api/v1/account/transfer`  
  Transfer money between accounts (requires JWT).  
  **Body:**  
  ```json
  {
    "to": "recipientUserId",
    "amount": number
  }
  ```
  **Returns:** `{ "message": "Transfer successful" }`

---

**Note:**  
- All protected routes require an `Authorization: Bearer <token>` header.
- Passwords are hashed using bcrypt.
- Input validation is enforced using Zod schemas.
## License

ISC