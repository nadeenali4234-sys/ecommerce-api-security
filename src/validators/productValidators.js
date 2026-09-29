const { body, validationResult } = require("express-validator");

const validateProduct = [
 body("name")
  .trim()
  .escape()
  .notEmpty()
    .withMessage("Product name is required")
    .isLength({ max: 150 })
    .withMessage("Product name must not exceed 150 characters"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than zero"),

  body("stock_quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock quantity must be a non-negative integer"),

  body("description")
  .optional()
  .trim()
  .escape()
    .isLength({ max: 1000 })
    .withMessage("Description must not exceed 1000 characters"),

  body("sku")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("SKU must not exceed 50 characters")
];

const handleProductValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array()
    });
  }

  next();
};

module.exports = {
  validateProduct,
  handleProductValidationErrors
};