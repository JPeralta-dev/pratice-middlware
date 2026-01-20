import { pathData } from "../../../config/route/route";
import { ICrudReposity } from "../../../interfaces/Repository/repository";
import path from "path";
export class ServiceTaks {
  constructor(
    private readonly paths: string,
    private readonly classUtilsFiles: ICrudReposity<any>,
  ) {
    this.paths = path.join(process.cwd(), pathData.USERS, "/taks.json");
  }
}
