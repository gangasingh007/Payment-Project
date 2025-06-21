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
  **Body:** `{ username, password, firstName, lastName }`

- `POST /api/v1/user/signin`  
  Login and receive a JWT token.  
  **Body:** `{ username, password }`

- `PUT /api/v1/user/update`  
  Update user details (requires JWT).  
  **Body:** `{ username?, password?, firstName?, lastName? }`

- `GET /api/v1/user/bulk?filter=...`  
  Search users by name.

### Account

- `GET /api/v1/account/balance`  
  Get current user's account balance (requires JWT).

- `POST /api/v1/account/transfer`  
  Transfer money between accounts (requires JWT).  
  **Body:** `{ fromAccount, toAccount, amount }`

## Notes

- All protected routes require an `Authorization: Bearer <token>` header.
- Passwords are hashed using bcrypt.
- Input validation is enforced using Zod schemas.

## License

ISC