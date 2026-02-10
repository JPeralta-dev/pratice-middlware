import { AppError } from "./appError";

export class AuthError extends AppError {
  constructor(message: string = "Authentication failed") {
    super(401, "AUTH_ERROR", message);
  }
}
export class TokenExpiredAuthError extends AppError {
  constructor() {
    super(401, "TOKEN_EXPIRED", "Authentication token has expired");
  }
}

export class InvalidTokenError extends AppError {
  constructor() {
    super(401, "TOKEN_INVALID", "Authentication token is invalid");
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "User not authenticated") {
    super(401, "UNAUTHORIZED", message);
  }
}
