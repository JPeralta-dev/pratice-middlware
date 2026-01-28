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
      MiddlwareJwt.getIntance().verifyTokenRefresh(token);

      return SuccessProcess(2, 200);
    } catch (error) {
      return FailureProcess("", 500);
    }
  }
}
