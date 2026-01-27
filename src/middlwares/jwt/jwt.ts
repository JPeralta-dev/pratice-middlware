import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import Jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

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
    try {
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

      if (token.split(" ")[0] !== "Bearer") {
        res.status(409).json({
          error: {
            code: "TOKEN_INVALID_FORMAT",
            message: "Authentication token must be Bearer",
            detail: null,
          },
          timestamp: Date().toString(),
        });
        return;
      }

      Jwt.verify(token.split(" ")[1], this.secreyKey) as any;
      /**
       * Note: en este caso el metodo verify solo lanza exepciones cuando no esta correcto el token
       * pero se debe validad como if no como errores si no como una previa revisión a que si se evalue
       */

      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        res.status(401).json({
          error: {
            code: "TOKEN_EXPIRED",
            message: "Authentication token has expired",
            detail: null,
          },
          timestamp: Date().toString(),
        });
        return;
      }

      if (error instanceof JsonWebTokenError) {
        res.status(401).json({
          error: {
            code: "TOKEN_INVALID",
            message: "Authentication token is invalid",
            detail: null,
          },
          timestamp: Date().toString(),
        });
        return;
      }
    }
  }

  public static getIntance(): MiddlwareJwt {
    if (!this.instance) {
      return (this.instance = new MiddlwareJwt());
    }
    return this.instance;
  }
}
