/**
 * Standard API Response Formatter
 * Ensures predictable response shapes across all endpoints.
 */

function sendSuccess(res, data, statusCode = 200, pagination = null) {
  const response = {
    success: true,
    data
  };

  if (pagination) {
    response.pagination = {
      page: Number(pagination.page),
      limit: Number(pagination.limit),
      total: Number(pagination.total),
      pages: Number(pagination.pages)
    };
  }

  return res.status(statusCode).json(response);
}

module.exports = {
  sendSuccess
};
