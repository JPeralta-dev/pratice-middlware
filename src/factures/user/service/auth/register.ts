import { pathData } from "../../../../config/route/route";
import { ICrudReposity } from "../../../../interfaces/repository/repository";
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

import { typeUser } from "../../interface/user";

export class ServiceAuthRegister {
  private readonly path: string;
  private readonly repository: ICrudReposity<typeUser>;
  constructor() {
    this.path = path.join(process.cwd(), pathData.USERS, "/user.json");
    this.repository = new RepositoryUser(this.path);
  }

  async register({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<IFailureProcess<any> | ISuccessProcess<any>> {
    try {
      const existingUser = await this.repository.findById(email);

      if (existingUser && existingUser.username !== "")
        return FailureProcess("User already exists", 409);

      const satl = bcryptjs.genSaltSync(10);
      const hashedPassword = bcryptjs.hashSync(password, satl);

      this.repository.save({ username: email, password: hashedPassword });

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
      return FailureProcess("Error internal server", 500);
    }
  }
}
