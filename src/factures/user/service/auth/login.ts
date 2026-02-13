import { LoginDto } from "./../../../../dtos/user/user.input";
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
import { ICrudReposity } from "../../../../interfaces/repository/repository";

import path from "path";
import { RepositoryUser } from "../../repository/user";

import { instanceJwtMiddlware } from "../../../../middlwares/jwt/jwt";
import { typeUser, User } from "../../interface/user";
import { NotFoundError } from "../../../../exeptions/validetioError";
import { AppError } from "../../../../exeptions/appError";
import { AuthError } from "../../../../exeptions/authError";
import { LoginResponseDTO } from "../../../../dtos/user/user.output";
import { BaseResponse } from "../../../../interfaces/response/apiResponse";

export class ServiceAuthLogin {
  private readonly path: string;
  private readonly classUtilsFiles: ICrudReposity<typeUser>;
  constructor() {
    this.path = path.join(process.cwd(), pathData.USERS, "/user.json");
    this.classUtilsFiles = new RepositoryUser(this.path); // MALA PRACTICA ❌ lo se tengo flojera
  }

  async login(
    user: User,
  ): Promise<
    IFailureProcess<AppError> | ISuccessProcess<BaseResponse<LoginResponseDTO>>
  > {
    try {
      const userResult = await this.classUtilsFiles.findById(user.username);

      if (!userResult || userResult.username === "")
        return FailureProcess(new NotFoundError("User Not Found"), 404);

      const isPasswordValid = bcryptjs.compareSync(
        user.password, // -> esta viene de la request
        userResult.password, // -> la guardada en la base de datos
      );
      if (!isPasswordValid) {
        return FailureProcess(new AuthError(), 401);
      }

      const tokenExpire = instanceJwtMiddlware.createToken({
        sub: user.username, // El campo sub (subject) es el estándar JWT para identificar al usuario. También facilita usar req.user.username en controllers.
        username: user.username,
        email: user.username,
      });
      const tokenRefreshSecurity = instanceJwtMiddlware.createTokenRefresh({
        sub: user.username,
        username: user.username,
        email: user.username,
      });

      return SuccessProcess(
        {
          message: "Login successful",
          data: {
            user: {
              username: userResult.username,
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
      return FailureProcess(
        new AppError(500, "ERROR_INTERNAL", "Error internal server"),
        500,
      );
    }
  }
}
