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

export class ServiceAuthLogin {
  private readonly path: string;
  private readonly classUtilsFiles: ICrudReposity<User>; /* QUE TIPS MEJOR ES CON EL CONTRARO QUE TIENE ESE REPO */
  constructor() {
    this.path = path.join(process.cwd(), pathData.USERS, "/user.json");
    this.classUtilsFiles = new RepositoryUser(this.path);
  }

  login(dto: string): IFailureProcess<any> | ISuccessProcess<any> {
    try {
      const result = this.classUtilsFiles.findById(dto);
      console.log(result);
      if (!result) return FailureProcess("no se ha encontrado el usuario", 500);

      return SuccessProcess(`El usuario autenticado es ${dto}`, 200);
    } catch (error) {
      return FailureProcess("", 500);
    }
  }
}
