import { ICrudReposity } from "../../../interfaces/repository/repository";
import { FileServices } from "../../../utils/file/file";

import { typeTask } from "../types/task";

export class repositoryTaks implements ICrudReposity<typeTask> {
  private readonly utilsFiles: FileServices<typeTask>;
  constructor(public readonly pathTheFile: string) {
    this.utilsFiles = new FileServices<typeTask>(this.pathTheFile);
  }
  async save(data: typeTask): Promise<void> {
    await this.utilsFiles.writeFile(data);
  }

  delete(id: string): typeTask {
    throw new Error("Not implemented");
  }
  update(data: typeTask): typeTask {
    throw new Error("Not implemented");
  }

  async findById(id: string): Promise<typeTask | undefined> {
    const taks = await this.utilsFiles.readFile();

    const result = taks.find((value) => value.id === id);

    if (!result) {
      return undefined;
    }

    return result;
  }

  async find(): Promise<typeTask[]> {
    const vector = await this.utilsFiles.readFile();
    return vector;
  }

  async findByCreated(id: string): Promise<typeTask[]> {
    const vector = await this.utilsFiles.readFile();

    const result = vector.filter((value) => value.createdBy === id);

    return result;
  }
}
