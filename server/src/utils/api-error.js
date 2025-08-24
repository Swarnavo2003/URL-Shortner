class ApiError extends Error {
  constructor(statusCode, message, errors, stack) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class NotFoundError extends ApiError {
  constructor(message = "Resource not found", errors = null) {
    super(404, message, errors);
  }
}

class BadRequestError extends ApiError {
  constructor(message = "Bad request", errors = null) {
    super(400, message, errors);
  }
}

class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized", errors = null) {
    super(401, message, errors);
  }
}

class ForbiddenError extends ApiError {
  constructor(message = "Forbidden", errors = null) {
    super(403, message, errors);
  }
}

class InternalServerError extends ApiError {
  constructor(message = "Internal server error", errors = null) {
    super(500, message, errors);
  }
}

export {
  ApiError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
};
