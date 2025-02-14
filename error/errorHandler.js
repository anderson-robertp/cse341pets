const errorHandler = (err, req, res, next) => {
    if (err.code === 11000) {
      return res.status(409).json({
        error: "Duplicate key error",
        message: "A user with this email already exists."
      });
    }
    
    console.error(err);
    res.status(err.status || 500).json({
      error: err.message || "Internal Server Error"
    });
  };
  
  module.exports = errorHandler;
  