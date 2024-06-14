/**
 * Utility function to send error responses.
 * @param {Object} res - Express response object.
 * @param {number} statusCode - HTTP status code.
 * @param {string} message - Error message.
 */
const sendErrorResponse = (res, statusCode, message, dberor) => {
  res.status(statusCode).json({
    success: false,
    error: {
      code: statusCode,
      message: message,
      catch: dberor,
    },
  });
};

/**
 * Utility function to send success responses.
 * @param {Object} res - Express response object.
 * @param {number} statusCode - HTTP status code.
 * @param {string} message - Success message.
 * @param {Object} data - Response data.
 */
const sendSuccessResponse = (res, statusCode, message, data = {}) => {
  if (data !== null && data !== undefined) {
    res.status(statusCode).json({
      success: true,
      code: statusCode,
      message: message,
      data: data,
    });
  } else {
    // Jika data null atau undefined, kirim respons tanpa data
    res.status(statusCode).json({
      success: true,
      code: statusCode,
      message: message,
    });
  }
};

module.exports = {
  sendErrorResponse,
  sendSuccessResponse,
};
