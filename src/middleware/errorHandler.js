function errorHandler(error, req, res, next) {
  console.error("Internal server error:", error.message);

  res.status(error.status || 500).json({
    success: false,
    message: "Internal server error"
  });
}

module.exports = errorHandler;