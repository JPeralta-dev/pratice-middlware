import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { JwtMiddlware } from "../../../../middlwares/jwt/jwt";
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
      const payload = JwtMiddlware.getIntance().verifyTokenRefresh(token);

      const newAccessToken = JwtMiddlware.getIntance().createToken(
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

      return FailureProcess("Error internal server", 500);
    }
  }
}
