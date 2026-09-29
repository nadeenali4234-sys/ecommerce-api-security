# Security Review

## 1. Missing Input Validation

**Location:** Product API endpoints

**Risk:** Invalid or unexpected input may reach the application or database and cause errors or unexpected behavior.

**Severity:** Medium

**Proposed Fix:** Use input validation with express-validator or Zod. Validate product name, price, stock quantity, IDs, email, password, and user roles.

---

## 2. SQL Injection Risk

**Location:** Database queries

**Risk:** Building SQL queries by directly combining user input with SQL statements can allow SQL Injection attacks.

**Severity:** High

**Proposed Fix:** Use parameterized PostgreSQL queries with placeholders such as `$1`, `$2` and pass user values separately.

---

## 3. Password Protection

**Location:** User registration and login

**Risk:** Storing or exposing passwords in plain text can lead to account compromise if the database is leaked.

**Severity:** Critical

**Proposed Fix:** Use bcrypt to hash passwords and bcrypt.compare() during login. Passwords and password hashes must not be returned in API responses or logs.

---

## 4. Missing Authentication

**Location:** Protected API endpoints

**Risk:** Without authentication, unauthorized users may access protected resources or perform operations without proving their identity.

**Severity:** High

**Proposed Fix:** Implement JWT authentication with register, login, and protected `/api/auth/me` endpoints.

---

## 5. Missing Authorization

**Location:** Administrative operations such as product management

**Risk:** An authenticated customer may be able to perform actions that should only be available to administrators.

**Severity:** High

**Proposed Fix:** Implement authorization middleware using the `customer` and `admin` roles. Return HTTP 403 when the authenticated user's role is not allowed.

---

## 6. Sensitive Information in Environment or Source Files

**Location:** Environment configuration

**Risk:** Exposing database URLs, JWT secrets, or passwords can allow unauthorized access to the application or database.

**Severity:** Critical

**Proposed Fix:** Store sensitive values in `.env`, add `.env` to `.gitignore`, and create `.example.env` containing variable names without real values.

---

## 7. Unsafe Error Responses

**Location:** Error handling middleware

**Risk:** Returning stack traces, SQL errors, or internal file paths can reveal sensitive information about the application.

**Severity:** Medium

**Proposed Fix:** Use a centralized `errorHandler` and return safe error messages such as `Internal server error` without exposing internal details.
## 8. Cross-Site Scripting (XSS)

**Location:** Product name and description fields

**Risk:** Malicious HTML or JavaScript content submitted by users could become dangerous if later rendered as HTML by a client application.

**Severity:** High

**Proposed Fix:** Apply input escaping and enforce maximum text lengths. The API should return user content as data, and frontend applications must use safe output encoding. Helmet CSP is also enabled as an additional browser-side security layer.

---

## 9. Missing Security Headers

**Location:** Express application configuration

**Risk:** Missing HTTP security headers can increase exposure to common browser-based attacks.

**Severity:** Medium

**Proposed Fix:** Use Helmet middleware to add security-related HTTP response headers.

---

## 10. Excessive Login Attempts

**Location:** Login endpoint

**Risk:** Unlimited login attempts can enable brute-force attacks against user accounts.

**Severity:** High

**Proposed Fix:** Apply a strict rate limiter to the login endpoint with a maximum of 5 attempts per 15 minutes and return HTTP 429 when the limit is exceeded.

---

## 11. Insecure Direct Object Reference (IDOR)

**Location:** User resource endpoint `/api/users/:id`

**Risk:** An authenticated user could attempt to access another user's information by changing the user ID.

**Severity:** High

**Proposed Fix:** Compare the requested resource ID with the authenticated user's ID and allow administrators to access authorized resources. Return HTTP 403 when the user is not permitted to access the resource.

---

## 12. Unrestricted Cross-Origin Access

**Location:** CORS configuration

**Risk:** Allowing arbitrary origins could permit unauthorized websites to interact with the API from a browser context.

**Severity:** Medium

**Proposed Fix:** Restrict CORS to the required origin, methods, and headers instead of allowing all origins.