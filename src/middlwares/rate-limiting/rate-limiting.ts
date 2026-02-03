import { NextFunction, Request, Response } from "express";
import { instanceRateLimiting } from "../../config/db/redis/services/rateLimiting";

export class RateLimitingMiddlware {
  private static instace: RateLimitingMiddlware;

  public async rateLimitingByUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    // ahora mismo necesitaria el req.user para obtener el user
    try {
      const user = (req as any).user?.username;

      if (!user) {
        res.status(401).json({
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "User not authenticated",
          },
        });
        return;
      }

      const isAlwod = await instanceRateLimiting.rateControllerByUser(user);

      if (!isAlwod) {
        res.status(429).json({
          success: false,
          error: {
            code: "RATE_LIMIT_EXCEEDED",
            message: "Too many requests. Please try again later",
          },
        });
        return;
      }

      next();
    } catch (error) {
      console.error("Rate limit error:", error);
      // En caso de error, permitir el request (fail open)
      next();
    }
  }

  public static getInstance(): RateLimitingMiddlware {
    if (!this.instace) {
      this.instace = new RateLimitingMiddlware();
      return this.instace;
    }

    return this.instace;
  }
}

export const RateMiddlware = RateLimitingMiddlware.getInstance();
