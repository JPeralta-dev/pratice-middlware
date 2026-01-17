import { NextFunction, Request, Response } from "express";
import { ServiceAuthLogin } from "../../service/auth/login";

export class AuthController {
  constructor(private readonly serviceAuth: ServiceAuthLogin) {
    this.serviceAuth;

    this.login = this.login.bind(this);
  }

  login(req: Request, res: Response, next: NextFunction): void {
    const body = req.body;

    const result = this.serviceAuth.login(body);

    if (!result.success) {
      const error = {
        status: result.statuCode,
        message: result.error,
      };
      return next(error);
    }

    res.status(result.statuCode).json({ message: result.value });
  }

  register(req: Request, res: Response, next: NextFunction): void {
    const body = req.body;

    const result = this.serviceAuth.register(body);

    if (!result.success) {
      const error = {
        status: result.statuCode,
        message: result.error,
      };
      return next(error);
    }

    res.status(result.statuCode).json({ message: result.value });
  }
}
