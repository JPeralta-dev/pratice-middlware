import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import Jwt, {
  JsonWebTokenError,
  TokenExpiredError,
  JwtPayload,
} from "jsonwebtoken";
import { FailureProcess } from "../../utils/result/result";

config();

export class JwtMiddlware {
  private static instance: JwtMiddlware;
  private readonly secretKey!: string | any;

  private constructor() {
    this.secretKey = process.env.SECRET_KEY;
    this.verifyToken = this.verifyToken.bind(this);
    this.verifyTokenRefresh = this.verifyTokenRefresh.bind(this);
  }

  createToken(dto: any): string {
    const jti = crypto.randomUUID(); //  identificador unico
    return Jwt.sign({ ...dto, jti, type: "access" }, this.secretKey, {
      algorithm: "HS256",
      expiresIn: "5m",
    });
  }

  createTokenRefresh(dto: any): string {
    const jti = crypto.randomUUID();
    return Jwt.sign({ ...dto, jti, type: "refresh" }, this.secretKey, {
      algorithm: "HS256",
      expiresIn: "7d",
    });
  }

  verifyToken(req: Request, res: Response, next: NextFunction): void {
    try {
      const token = req.headers.authorization;

      if (!token) {
        res.status(401).json({
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

      const payload = Jwt.verify(
        token.split(" ")[1],
        this.secretKey,
      ) as JwtPayload; // -> larxar exepcion si algo pasa y si no sigu4e como si nada
      /**
       * Note: en este caso el metodo verify solo lanza exepciones cuando no esta correcto el token
       * pero se debe validad como if no como errores si no como una previa revisión a que si se evalue
       */

      req.body.info = {
        user: payload.sub,
      };
      console.log(req.body);

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

  verifyTokenRefresh(token: any): any {
    try {
      if (!token)
        return FailureProcess(
          {
            error: {
              code: "TOKEN_MISSING",
              message: "Authentication token is required",
              detail: null,
            },
            timestamp: Date().toString(),
          },
          401,
        );
      const result = Jwt.verify(token, this.secretKey);
      return result;
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        console.log(error);

        return FailureProcess(
          {
            error: {
              code: "TOKEN_INVALID",
              message: "Authentication token is invalid",
              detail: null,
            },
            timestamp: Date().toString(),
          },
          401,
        );
      }

      if (error instanceof TokenExpiredError) {
        return FailureProcess(
          {
            error: {
              code: "TOKEN_EXPIRED",
              message: "Authentication token has expired",
              detail: null,
            },
            timestamp: Date().toString(),
          },
          401,
        );
      }
    }
  }

  public static getIntance(): JwtMiddlware {
    if (!this.instance) {
      return (this.instance = new JwtMiddlware());
    }
    return this.instance;
  }
}

export const instanceJwtMiddlware = JwtMiddlware.getIntance();
