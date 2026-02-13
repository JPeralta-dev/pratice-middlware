import { NextFunction, Request, Response } from "express";
import z from "zod";

export const validateDto = (schemaParse: z.ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      schemaParse.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(422).json({
          error: {
            code: "VALIDATION_ERROR",
            message: "",
            detail: error.issues,
          },
          timestamp: Date().toString(),
        });
        return;
      }

      next(error);
    }
  };
};
