import { pathData } from "../../../config/route/route";
import path from "path";
import { repositoryTaks } from "../repository/taks";
import {
  IFailureProcess,
  ISuccessProcess,
} from "../../../interfaces/resutl/result";
import { FailureProcess, SuccessProcess } from "../../../utils/result/result";
import { AppError } from "../../../exeptions/appError";
import {
  ConflictError,
  NotFoundError,
} from "../../../exeptions/validetioError";
import { BaseResponse } from "../../../interfaces/response/apiResponse";
import { GetTaksResponse } from "../../../dtos/taks/taks.ouput";
export class ServiceTaks {
  private readonly paths: string;
  private readonly classUtilsFiles: repositoryTaks;
  constructor() {
    this.paths = path.join(process.cwd(), pathData.TACKS, "/taks.json");
    this.classUtilsFiles = new repositoryTaks(this.paths);
  }

  async save(
    object: any,
  ): Promise<
    IFailureProcess<AppError> | ISuccessProcess<BaseResponse<string>>
  > {
    try {
      const findTaks = await this.classUtilsFiles.findById(object.id);
      if (findTaks)
        return FailureProcess(new ConflictError("Taks already exists"), 404);

      await this.classUtilsFiles.save(object);
      return SuccessProcess(
        {
          message: "Register successful",
          timestamp: new Date().toISOString(),
        },
        200,
      );
    } catch (error) {
      console.log(error);

      return FailureProcess(
        new AppError(500, "ERROR_INTERNAL", "Error internal server"),
        500,
      );
    }
  }
  async findByCreated(
    id: string,
  ): Promise<
    IFailureProcess<AppError> | ISuccessProcess<BaseResponse<GetTaksResponse>>
  > {
    try {
      const resultOfFind = await this.classUtilsFiles.findByCreated(id);
      if (!resultOfFind)
        return FailureProcess(new NotFoundError("Not Found taks"), 404);

      return SuccessProcess(
        {
          message: "Get succesgul",
          data: {
            taks: resultOfFind,
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
  // find(): IFailureProcess<any> | ISuccessProcess<any> {
  //   try {
  //     return SuccessProcess("", 200);
  //   } catch (error) {
  //     return FailureProcess("", 500);
  //   }
  // }
  // update(): IFailureProcess<any> | ISuccessProcess<any> {
  //   try {
  //     return SuccessProcess("", 200);
  //   } catch (error) {
  //     return FailureProcess("", 500);
  //   }
  // }
}
