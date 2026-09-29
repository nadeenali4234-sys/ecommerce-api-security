const express = require("express");

const {
  createUser,
  loginUser,
  getMe,
  getUserById
} = require("../controllers/usersController");

const {
  authenticateToken
} = require("../middleware/authMiddleware");

const {
  validateUser,
  handleValidationErrors
} = require("../validators/userValidators");

const router = express.Router();

router.post(
  "/",
  validateUser,
  handleValidationErrors,
  createUser
);

router.post("/login", loginUser);

router.get("/me", authenticateToken, getMe);

router.get("/:id", authenticateToken, getUserById);

module.exports = router;