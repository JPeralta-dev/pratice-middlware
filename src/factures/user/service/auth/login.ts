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
import { typeUser } from "../../interface/user";

export class ServiceAuthLogin {
  private readonly path: string;
  private readonly classUtilsFiles: ICrudReposity<typeUser>;
  constructor() {
    this.path = path.join(process.cwd(), pathData.USERS, "/user.json");
    this.classUtilsFiles = new RepositoryUser(this.path); // MALA PRACTICA ❌ lo se tengo flojera
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<IFailureProcess<string> | ISuccessProcess<any>> {
    try {
      const userResult = await this.classUtilsFiles.findById(email);
      console.log(userResult);

      if (!userResult || userResult.username === "")
        return FailureProcess("User Not Found", 404);

      const isPasswordValid = bcryptjs.compareSync(
        password, // -> esta viene de la request
        userResult.password, // -> la guardada en la base de datos
      );
      if (!isPasswordValid) {
        return FailureProcess(
          "Password or username incorrect, please try again",
          401,
        );
      }

      const tokenExpire = instanceJwtMiddlware.createToken({
        sub: email, // El campo sub (subject) es el estándar JWT para identificar al usuario. También facilita usar req.user.username en controllers.
        username: email,
        email,
      });
      const tokenRefreshSecurity = instanceJwtMiddlware.createTokenRefresh({
        sub: email,
        username: email,
        email,
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
      return FailureProcess("Error internal server", 500);
    }
  }
}
