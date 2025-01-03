// middleware/error.js
export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        message: message
    });
};

// Keep your handleError utility for creating errors
export const handleError = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.message = message;
    return error;
};