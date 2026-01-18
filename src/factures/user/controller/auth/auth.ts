import { NextFunction, Request, Response } from "express";
import { ServiceAuthLogin } from "../../service/auth/login";
import { ServiceAuthRegister } from "../../service/auth/register";

export class AuthController {
  constructor(
    private readonly serviceAuth: ServiceAuthLogin,
    private readonly serviceRegister: ServiceAuthRegister,
  ) {
    this.serviceAuth;
    this.serviceRegister;

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  login(req: Request, res: Response, next: NextFunction): void {
    const body = req.body;
    console.log("pase por el controllador");

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

    const result = this.serviceRegister.register(body);

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
