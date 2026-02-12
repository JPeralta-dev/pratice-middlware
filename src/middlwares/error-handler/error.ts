import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { AppError } from "../../exeptions/appError";

export const ErrorMiddlware: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
      },
      timestamp: Date().toString(),
    });
  }
};
