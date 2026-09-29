const express = require("express");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deactivateProduct
} = require("../controllers/productsController");

const {
  authenticateToken
} = require("../middleware/authMiddleware");

const {
  authorizeRoles
} = require("../middleware/authorize");

const {
  validateProduct,
  handleProductValidationErrors
} = require("../validators/productValidators");

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin"),
  validateProduct,
  handleProductValidationErrors,
  createProduct
);

router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  validateProduct,
  handleProductValidationErrors,
  updateProduct
);

router.patch(
  "/:id/deactivate",
  authenticateToken,
  authorizeRoles("admin"),
  deactivateProduct
);

module.exports = router;