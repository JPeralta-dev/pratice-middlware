import { NextFunction, Request, Response } from "express";
import { ServiceAuthLogin } from "../../service/auth/login";
import { ServiceAuthRegister } from "../../service/auth/register";
import { serviceRefreshToken } from "../../service/auth/refresh";

export class AuthController {
  constructor(
    private readonly serviceAuth: ServiceAuthLogin,
    private readonly serviceRegister: ServiceAuthRegister,
    private readonly serviceRefresh: serviceRefreshToken,
  ) {
    this.serviceAuth;
    this.serviceRegister;

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const CredentialsData = req.body;

    const authResult = await this.serviceAuth.login(CredentialsData);

    if (!authResult.success) {
      return next(authResult.error);
    }

    res.status(authResult.statusCode).json({ message: authResult.value });
  }

  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const requestData = req.body;

    const operationResult = await this.serviceRegister.register(requestData);

    if (!operationResult.success) {
      return next(operationResult.error);
    }

    res
      .status(operationResult.statusCode)
      .json({ message: operationResult.value });
  }

  refreshToken(req: Request, res: Response, next: NextFunction): void {
    const requestData = req.body.token;

    const operationResult = this.serviceRefresh.verifyAccesToken(requestData);

    if (!operationResult.success) {
      return next(operationResult.error);
    }
    res
      .status(operationResult.statusCode)
      .json({ message: operationResult.value });
  }
}
