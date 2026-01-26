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

import { RepositoryUser } from "../../repository/user";
import path from "path";
import bcryptjs from "bcryptjs";
import { User } from "../../entity/User";

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
      const resultFind = this.classUtilsFiles.findById(email);

      if (resultFind.getPassword().length === 0)
        return FailureProcess("user exist", 404);

      const saltScript = bcryptjs.genSaltSync(10);
      const newPassword = bcryptjs.hashSync(password, saltScript);

      const user = new User(email, newPassword);
      this.classUtilsFiles.save(user);

      return SuccessProcess(
        {
          message: "Register successful",
          data: {
            user: {
              username: email,
            },
          },
          timestamp: new Date().toISOString(),
        },
        200,
      );
    } catch (error) {
      return FailureProcess("", 500);
    }
  }
}
