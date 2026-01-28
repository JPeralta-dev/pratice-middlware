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
      const payload = MiddlwareJwt.getIntance().verifyTokenRefresh(token);

      const newAccessToken = MiddlwareJwt.getIntance().createToken(
        payload.email,
      );

      return SuccessProcess(
        {
          message: "Refresh Token successful",
          data: {
            user: {
              username: payload.email,
            },
            tokens: {
              accessToken: {
                token: `${newAccessToken}`,
                tokenType: "Bearer",
              },
            },
          },
          timestamp: new Date().toISOString(),
        },
        200,
      );
    } catch (error) {
      console.log(error);

      return FailureProcess("", 500);
    }
  }
}
