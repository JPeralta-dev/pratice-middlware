import { NextFunction, Request, Response } from "express";
import { instanceRateLimiting } from "../../config/db/redis/services/rateLimiting";
import { UnauthorizedError } from "../../exeptions/authError";

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
        return next(new UnauthorizedError());
      }

      const isAlwod = await instanceRateLimiting.rateControllerByUser(user);

      res.set({
        "X-RateLimit-Limit": isAlwod.limit.toString(),
        "X-RateLimit-Remaining": isAlwod.remaining.toString(),
        "X-RateLimit-Reset": isAlwod.resetAt.toString(),
      });

      if (!isAlwod) {
        return next(new RateLimitingMiddlware());
      }

      next();
    } catch (error) {
      // En caso de error, permitir el request (fail open)
      next();
    }
  }

  public async rateLimitingByIp(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const ip = req.ip;
      console.log(ip);

      if (!ip) {
        return next(new UnauthorizedError());
      }

      const isAlwod = await instanceRateLimiting.rateControllerByIp(ip, 3, 60);
      console.log(isAlwod);

      res.set({
        "X-RateLimit-Limit": isAlwod.limit.toString(),
        "X-RateLimit-Remaining": isAlwod.remaining.toString(),
        "X-RateLimit-Reset": isAlwod.resetAt.toString(),
      });
      if (!isAlwod) {
        return next(new RateLimitingMiddlware());
      }

      next();
    } catch (error) {
      next(error);
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
