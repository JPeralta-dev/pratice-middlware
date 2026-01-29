import bcryptjs from "bcryptjs";
import { pathData } from "../../../../config/route/route";
import {
  IFailureProcess,
  ISuccessProcess,
} from "../../../../interfaces/resutl/result";
import {
  FailureProcess,
  SuccessProcess,
} from "../../../../utils/result/result";
import { ICrudReposity } from "../../../../interfaces/Repository/repository";

import path from "path";
import { RepositoryUser } from "../../repository/user";

import { jwtObject } from "../../../../framework/express";
import { User } from "../../entity/User";

export class ServiceAuthLogin {
  private readonly path: string;
  private readonly classUtilsFiles: ICrudReposity<User>;
  constructor() {
    this.path = path.join(process.cwd(), pathData.USERS, "/user.json");
    this.classUtilsFiles = new RepositoryUser(this.path);
  }

  login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): IFailureProcess<any> | ISuccessProcess<any> {
    try {
      const result = this.classUtilsFiles.findById(email);
      if (!result || result.getUsername() === "")
        return FailureProcess("User Not Found", 404);
      const comparePassword = bcryptjs.compareSync(
        password,
        result.getPassword(),
      );
      if (!comparePassword) {
        return FailureProcess(
          "Password or username incorrecto, please try again",
          403,
        );
      }

      const tokenExpire = jwtObject.createToken({ email });
      const tokenRefreshSecurity = jwtObject.createTokenRefresh({
        email,
      });

      return SuccessProcess(
        {
          message: "Login successful",
          data: {
            user: {
              username: result.getUsername(),
            },
            tokens: {
              accessToken: {
                token: `${tokenExpire}`,
                tokenType: "Bearer",
              },
              refreshToken: {
                token: `${tokenRefreshSecurity}`,
                tokenType: "Bearer",
              },
            },
          },
          timestamp: new Date().toISOString(),
        },
        200,
      );
    } catch (error) {
      return FailureProcess("Error internal server", 500);
    }
  }
}
