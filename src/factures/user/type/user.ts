declare global {
  namespace Express {
    interface Request {
      user?: {
        sub: string;
        username: string;
        type: string;
        iat: number;
        exp: number;
      };
    }
  }
}

export {};
