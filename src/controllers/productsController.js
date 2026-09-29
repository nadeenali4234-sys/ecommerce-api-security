const pool = require("../config/database");

async function getProducts(req, res, next) {
  try {
    const result = await pool.query(
      `SELECT
        id,
        category_id,
        name,
        description,
        price,
        stock_quantity,
        sku,
        is_active,
        created_at
       FROM products
       ORDER BY id DESC`
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }

    const result = await pool.query(
      `SELECT
        id,
        category_id,
        name,
        description,
        price,
        stock_quantity,
        sku,
        is_active,
        created_at
       FROM products
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const {
      category_id,
      name,
      description,
      price,
      stock_quantity,
      sku
    } = req.body;

    if (!name || price === undefined || price === null) {
      return res.status(400).json({
        success: false,
        message: "Valid name and price are required"
      });
    }
    if (Number(price) <= 0) {
  return res.status(400).json({
    success: false,
    message: "Price must be greater than zero"
  });
}

    if (stock_quantity !== undefined && stock_quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock quantity cannot be negative"
      });
    }

    const result = await pool.query(
      `INSERT INTO products
      (category_id, name, description, price, stock_quantity, sku)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING
        id,
        category_id,
        name,
        description,
        price,
        stock_quantity,
        sku,
        is_active,
        created_at`,
      [
        category_id || null,
        name,
        description || null,
        price,
        stock_quantity || 0,
        sku || null
      ]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "SKU already exists"
      });
    }

    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }

    const {
      category_id,
      name,
      description,
      price,
      stock_quantity,
      sku
    } = req.body;

    if (!name || price === undefined || price === null) {
      return res.status(400).json({
        success: false,
        message: "Valid name and price are required"
      });
    }

    if (stock_quantity !== undefined && stock_quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock quantity cannot be negative"
      });
    }

    const result = await pool.query(
      `UPDATE products
       SET
         category_id = $1,
         name = $2,
         description = $3,
         price = $4,
         stock_quantity = $5,
         sku = $6
       WHERE id = $7
       RETURNING
         id,
         category_id,
         name,
         description,
         price,
         stock_quantity,
         sku,
         is_active,
         created_at`,
      [
        category_id || null,
        name,
        description || null,
        price,
        stock_quantity || 0,
        sku || null,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "SKU already exists"
      });
    }

    next(error);
  }
}

async function deactivateProduct(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }

    const result = await pool.query(
      `UPDATE products
       SET is_active = false
       WHERE id = $1
       RETURNING
         id,
         category_id,
         name,
         description,
         price,
         stock_quantity,
         sku,
         is_active,
         created_at`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deactivated successfully",
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deactivateProduct
};