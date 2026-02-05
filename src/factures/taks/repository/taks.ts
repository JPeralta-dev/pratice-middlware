import { ICrudReposity } from "../../../interfaces/repository/repository";
import { fileUtils } from "../../../utils/file/file";
import { Taks } from "../entity/taks";

export class repositoryTaks extends fileUtils implements ICrudReposity<Taks> {
  private readonly utilsFiles: fileUtils;
  constructor(public readonly pathTheFile: string) {
    super(pathTheFile);
    this.utilsFiles = new fileUtils(this.pathTheFile);
  }
  async save(data: Taks): Promise<void> {
    await this.utilsFiles.writeFile(data);
  }

  delete(id: string): any {
    return undefined;
  }
  update(data: Taks): any {
    return undefined;
  }

  async findById(id: string): Promise<any> {
    const vector = await this.utilsFiles.readFile();

    const result = vector.find((value) => value.id === id);

    if (!result) {
      return undefined;
    }

    return result;
  }

  find(): any {
    const vector = this.utilsFiles.readFile();
    return vector;
  }

  async findByCreated(id: string): Promise<any> {
    const vector = await this.utilsFiles.readFile();

    const result = vector.filter((value) => value.createdBy === id);

    return result;
  }
}
