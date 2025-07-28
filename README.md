# Payment Project Backend API Documentation

This document provides a detailed overview of all backend API routes and endpoints for the Payment Project. Each endpoint includes its HTTP method, path, required authentication, request parameters, and response format.

---

## User Routes (`/api/user`)

### 1. **POST `/signup`**
- **Description:** Register a new user.
- **Request Body:**
  - `username` (string, required)
  - `password` (string, required, min 6 chars)
  - `firstName` (string, required)
  - `lastName` (string, required)
- **Response:**
  - `201 Created`: JWT token
  - `400 Bad Request`: Missing fields or username exists
  - `500 Internal Server Error`

---

### 2. **POST `/signin`**
- **Description:** Authenticate user and return JWT token.
- **Request Body:**
  - `username` (string, required)
  - `password` (string, required)
- **Response:**
  - `200 OK`: JWT token
  - `404 Not Found`: User not found
  - `401 Unauthorized`: Invalid password
  - `500 Internal Server Error`

---

### 3. **PUT `/update`**
- **Description:** Update user details. Requires authentication.
- **Headers:**
  - `Authorization: Bearer <token>`
- **Request Body:** (at least one field required)
  - `username` (string)
  - `firstName` (string)
  - `lastName` (string)
  - `password` (string)
- **Response:**
  - `200 OK`: User updated
  - `404 Not Found`: User not found
  - `400 Bad Request`: No fields provided
  - `500 Internal Server Error`

---

### 4. **GET `/bulk?filter=<string>`**
- **Description:** Get a list of users filtered by first or last name. Requires authentication.
- **Headers:**
  - `Authorization: Bearer <token>`
- **Query Params:**
  - `filter` (string, optional)
- **Response:**
  - `200 OK`: List of users
  - `500 Internal Server Error`

---

### 5. **GET `/me`**
- **Description:** Get current authenticated user's details and account info.
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  - `200 OK`: User and account info
  - `500 Internal Server Error`

---

## Account Routes (`/api/account`)

### 1. **GET `/balance`**
- **Description:** Get the balance of the authenticated user's account.
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  - `200 OK`: `{ balance: number }`
  - `403 Forbidden`: Unauthorized
  - `404 Not Found`: Account not found
  - `500 Internal Server Error`

---

### 2. **POST `/transfer`**
- **Description:** Transfer funds between accounts.
- **Request Body:**
  - `fromAccount` (string, required)
  - `toAccount` (string, required)
  - `amount` (number, required, between 1 and 10000)
- **Response:**
  - `200 OK`: Transfer successful
  - `400 Bad Request`: Validation errors
  - `500 Internal Server Error`

---

## Notes
- All protected routes require a valid JWT token in the `Authorization` header.
- Error responses include a `message` or `error` field describing the issue.
- Account is automatically created for each user upon signup with a random balance between 1 and 10000.

---

## Example Usage

### Signup
```http
POST /api/user/signup
Content-Type: application/json
{
  "username": "johndoe",
  "password": "secret123",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Get Balance
```http
GET /api/account/balance
Authorization: Bearer <token>
```

### Transfer Funds
```http
POST /api/account/transfer
Content-Type: application/json
{
  "fromAccount": "<accountId1>",
  "toAccount": "<accountId2>",
  "amount": 500
}
```

---

For further details, refer to the source code in the `backend/Routes/` directory.
