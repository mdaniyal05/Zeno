const notFound = (req, res, next) => {
  const error = new Error(`${req.originalUrl} - Not Found`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join(", ");
  } else if (err.name === "SequelizeEmptyResultError") {
    statusCode = 404;
    message = "Resource Not Found";
  } else if (err.name === "SequelizeForeignKeyConstraintError") {
    statusCode = 400;
    message = "Foreign key constraint violation";
  } else if (
    err.name === "SequelizeConnectionError" ||
    err.name === "SequelizeConnectionRefusedError"
  ) {
    statusCode = 503;
    message = "Database connection error";
  } else if (err.code === "EREQUEST") {
    statusCode = 400;
    message = "Invalid SQL request";
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
