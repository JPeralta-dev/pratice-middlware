import { ServiceSource } from "../types/typesServices";
import { AppError } from "./appError";

export class ConnectionError extends AppError {
  constructor(
    service: ServiceSource,
    errorSource: ErrorConections,
    message: string = "Connection failed",
  ) {
    super(503, errorSource, message, service);
  }
}

export class TimeoutError extends AppError {
  constructor(message = "Request timeout", service: ServiceSource) {
    super(504, "TIMEOUT_ERROR", message, service);
  }
}

export class AuthenticationError extends AppError {
  constructor(message = "Authentication failed", service: ServiceSource) {
    super(401, "AUTHENTICATION_ERROR", message, service);
  }
}

export type ErrorConections = "CONNECTION_ERROR" | "ECONNREFUSED";
