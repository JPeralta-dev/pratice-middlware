import { config } from "dotenv";
import Jwt from "jsonwebtoken";

config();

export class MiddlwareJwt {
  private static instance: MiddlwareJwt;
  private readonly secreyKey!: string | any;

  private constructor() {
    this.secreyKey = process.env.SECRET_KEY;
  }

  createToken(dto: any): string {
    return Jwt.sign(dto, this.secreyKey, {
      algorithm: "HS256",
      expiresIn: "30m",
    });
  }

  verifyToken(): void {}

  public static getIntance(): MiddlwareJwt {
    if (!this.instance) {
      return (this.instance = new MiddlwareJwt());
    }
    return this.instance;
  }
}
