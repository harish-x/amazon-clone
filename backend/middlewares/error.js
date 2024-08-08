module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV == "development") {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  }
  if (process.env.NODE_ENV == "production") {
    let message = err.message;
    let error = new Error(message);
    if (err.name == "ValidationError") {
      message = Object.values(err.errors).map((value) => value.message);
      error = new Error(message);
      error.statusCode = 400;
    }
    if (err.name == "CastError") {
      message = `Resource not found1 ${err.path}`;
      error = new Error(message);
      error.statusCode = 400;
    }
    if (err.code === 11000) {
      let message = `Duplicate key ${Object.keys(err.keyValue)} error`;
      error = new Error(message);
      error.statusCode = 400;
    }
    if (err.name == "JSONWebTokenError") {
      let message = "Token invalid";
      error = new Error(message);
      error.statusCode = 400;
    }
    res.status(err.statusCode).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};
