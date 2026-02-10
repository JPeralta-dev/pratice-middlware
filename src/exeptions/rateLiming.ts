import { AppError } from "./appError";

export class RateLimitingError extends AppError {
  constructor(message: string = "Too many requests. Please try again later") {
    super(429, "RATE_LIMIT_EXCEEDED", message);
  }
}
