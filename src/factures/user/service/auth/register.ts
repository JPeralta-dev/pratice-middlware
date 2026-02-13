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

import { typeUser, User } from "../../interface/user";
import { AppError } from "../../../../exeptions/appError";
import { ConflictError } from "../../../../exeptions/validetioError";

export class ServiceAuthRegister {
  private readonly path: string;
  private readonly repository: ICrudReposity<typeUser>;
  constructor() {
    this.path = path.join(process.cwd(), pathData.USERS, "/user.json");
    this.repository = new RepositoryUser(this.path);
  }

  async register(
    user: User,
  ): Promise<IFailureProcess<AppError> | ISuccessProcess<any>> {
    try {
      const existingUser = await this.repository.findById(user.username);

      if (existingUser && existingUser.username !== "")
        return FailureProcess(new ConflictError("User already exists"), 409);

      const satl = bcryptjs.genSaltSync(10);
      const hashedPassword = bcryptjs.hashSync(user.password, satl);

      this.repository.save({
        username: user.username,
        password: hashedPassword,
      });

      return SuccessProcess(
        {
          message: "Register successful",
          data: {
            user: {
              username: user.username,
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
