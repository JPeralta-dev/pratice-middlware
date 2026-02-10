import { AppError } from "./appError";

export class ValidationError extends AppError {
  constructor(message: string, fieldErros?: Record<string, string>) {
    super(422, "VALIDATION_ERROR", message);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(422, "NOT_FOUND_ERROR", message);
  }
}
