import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";

config();

export class MiddlwareJwt {
  private static instance: MiddlwareJwt;
  private readonly secreyKey!: string | any;

  private constructor() {
    this.secreyKey = process.env.SECRET_KEY;
    this.verifyToken = this.verifyToken.bind(this);
  }

  createToken(dto: any): string {
    return Jwt.sign(dto, this.secreyKey, {
      algorithm: "HS256",
      expiresIn: "5m",
    });
  }

  verifyToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization;

    if (!token) {
      res.status(409).json({
        error: {
          code: "TOKEN_MISSING",
          message: "Authentication token is required",
          detail: null,
        },
        timestamp: Date().toString(),
      });
      return;
    }

    if (token.split(" ")[0] === "Bearer") {
      res.status(409).json({
        error: {
          code: "TOKEN_INVALID",
          message: "Authentication token correct is required",
          detail: null,
        },
        timestamp: Date().toString(),
      });
      return;
    }

    const tokenValidation = Jwt.verify(token.split(" ")[1], this.secreyKey);
    console.log(token.split(" ")[1]);
    console.log(tokenValidation);

    next();
  }

  public static getIntance(): MiddlwareJwt {
    if (!this.instance) {
      return (this.instance = new MiddlwareJwt());
    }
    return this.instance;
  }
}
