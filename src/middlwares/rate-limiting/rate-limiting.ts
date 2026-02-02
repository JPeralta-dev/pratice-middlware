import { NextFunction, Request, Response } from "express";

export class RateLimitingMiddlware {
  private static instace: RateLimitingMiddlware;

  public rateLimitingByUser(req: Request, res: Response, next: NextFunction) {
    // ahora mismo necesitaria el req.user para obtener el user
    const user = (req as any).user?.username;
  }

  public static getInstance(): RateLimitingMiddlware {
    if (!this.instace) {
      this.instace = new RateLimitingMiddlware();
      return this.instace;
    }

    return this.instace;
  }
}
