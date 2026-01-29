import { pathData } from "../../../config/route/route";
import path from "path";
import { repositoryTaks } from "../repository/taks";
import {
  IFailureProcess,
  ISuccessProcess,
} from "../../../interfaces/resutl/result";
import { FailureProcess, SuccessProcess } from "../../../utils/result/result";
export class ServiceTaks {
  private readonly paths: string;
  private readonly classUtilsFiles: repositoryTaks;
  constructor() {
    this.paths = path.join(process.cwd(), pathData.TACKS, "/taks.json");
    this.classUtilsFiles = new repositoryTaks(this.paths);
  }

  save(object: any): IFailureProcess<any> | ISuccessProcess<any> {
    try {
      const findTaks = this.classUtilsFiles.findById(object.id);
      if (findTaks) return FailureProcess("ya esta tarea tiene ese id", 404);

      this.classUtilsFiles.save(object);
      return SuccessProcess("saved successfully", 200);
    } catch (error) {
      console.log(error);

      return FailureProcess("Error internal server", 500);
    }
  }
  findByCreated(id: string): IFailureProcess<any> | ISuccessProcess<any> {
    try {
      const resultOfFind = this.classUtilsFiles.findByCreated(id);
      if (!resultOfFind) return FailureProcess("No tienes tareas aun", 404);

      return SuccessProcess(resultOfFind, 200);
    } catch (error) {
      console.log(error);

      return FailureProcess("Error internal server", 500);
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
