import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { MiddlwareJwt } from "../../../../middlwares/jwt/jwt";
import {
  IFailureProcess,
  ISuccessProcess,
} from "./../../../../interfaces/resutl/result";
import {
  FailureProcess,
  SuccessProcess,
} from "./../../../../utils/result/result";

export class serviceRefreshToken {
  verifyAccesToken(token: any): IFailureProcess<any> | ISuccessProcess<any> {
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
          409,
        );
      MiddlwareJwt.getIntance().verifyTokenRefresh(token);

      return SuccessProcess(2, 200);
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
      return FailureProcess("", 500);
    }
  }
}
