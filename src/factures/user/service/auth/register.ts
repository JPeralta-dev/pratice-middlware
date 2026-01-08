import { pathData } from "../../../../config/route/route";
import { ICrudReposity } from "../../../../interfaces/Repository/repository";
import {
  IFailureProcess,
  ISuccessProcess,
} from "../../../../interfaces/resutl/result";
import {
  FailureProcess,
  SuccessProcess,
} from "../../../../utils/result/result";
import { User } from "../../interface/user";
import { RepositoryUser } from "../../repository/user";
import path from "path";

export class ServiceAuthRegister {
  private readonly path: string;
  private readonly classUtilsFiles: ICrudReposity<User>;
  constructor() {
    this.path = path.join(process.cwd(), pathData.USERS, "/user.json");
    this.classUtilsFiles = new RepositoryUser(this.path);
  }

  register({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): IFailureProcess<any> | ISuccessProcess<any> {
    try {
      return SuccessProcess("", 200);
    } catch (error) {
      return FailureProcess("", 500);
    }
  }
}
