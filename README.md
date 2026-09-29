# E-commerce API

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file and add:

```env
PORT=3000
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=1h
```

Do not upload `.env` or any secret values to GitHub.

## Run

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

## Security Features

* Environment variables for sensitive configuration
* `.env` excluded from Git
* Input validation using `express-validator`
* Parameterized PostgreSQL queries
* Password hashing using bcrypt
* JWT authentication
* Role-based authorization
* IDOR protection
* Helmet security headers
* CORS configuration
* General API rate limiting
* Login rate limiting
* Centralized error handling
* Safe 404 responses
* XSS input escaping
* Secure logging
* Password hashes are never returned in API responses

## Endpoints

### Products

* GET `/api/products`
* GET `/api/products/:id`
* POST `/api/products` — Admin only
* PUT `/api/products/:id` — Admin only
* PATCH `/api/products/:id/deactivate` — Admin only

### Categories

* GET `/api/categories`
* GET `/api/categories/:id`
* POST `/api/categories`
* PUT `/api/categories/:id`

### Users / Authentication

* POST `/api/users` — Register
* POST `/api/users/login` — Login
* GET `/api/users/me` — Authenticated user
* GET `/api/users/:id` — Own data or Admin

## Authentication

Protected endpoints require a Bearer token:

```text
Authorization: Bearer <JWT_TOKEN>
```

Never share JWT tokens, passwords, database credentials, or other secrets.

## HTTP Status Codes

* `200` — Successful request
* `201` — Resource created
* `400` — Validation or invalid input
* `401` — Authentication required or invalid token
* `403` — Insufficient permissions
* `404` — Resource or route not found
* `409` — Duplicate resource
* `429` — Too many requests
* `500` — Internal server error

## Project Structure

```text
ecommerce-api/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── validators/
│   ├── app.js
│   └── server.js
├── .env
├── .example.env
├── .gitignore
├── package.json
├── README.md
└── REVIEW_SECURITY.md

