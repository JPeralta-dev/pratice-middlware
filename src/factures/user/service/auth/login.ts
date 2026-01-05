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
import { User } from "../../interface/user";
import { jwtObject } from "../../../../framework/express";

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

      if (password !== result.password)
        return FailureProcess("algo ta malo", 404);

      if (!result) return FailureProcess("no se ha encontrado el usuario", 500);
      const tokenExpire = jwtObject.createToken({ email, password });
      return SuccessProcess(`Usuario autenticado ${tokenExpire}`, 200);
    } catch (error) {
      return FailureProcess("", 500);
    }
  }
}
