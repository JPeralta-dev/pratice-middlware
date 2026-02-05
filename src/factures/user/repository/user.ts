import { ICrudReposity } from "../../../interfaces/repository/repository";
import { FileServices } from "../../../utils/file/file";

import { typeUser } from "../interface/user";

export class RepositoryUser implements ICrudReposity<typeUser> {
  private readonly utilsFiles: FileServices<typeUser>;
  constructor(public readonly pathTheFile: string) {
    this.utilsFiles = new FileServices<typeUser>(this.pathTheFile);
  }

  async save(data: typeUser): Promise<void> {
    await this.utilsFiles.writeFile(data);
  }

  delete(id: string): typeUser {
    throw new Error("Not implemented");
  }
  update(data: typeUser): typeUser {
    throw new Error("Not implemented");
  }

  async findById(id: string): Promise<typeUser | undefined> {
    const users = await this.utilsFiles.readFile();
    console.log(users);

    const foundUser = users.find((value) => value.username === id);

    if (!foundUser) {
      return undefined;
    }

    return foundUser;
  }

  async find(): Promise<typeUser[]> {
    throw new Error("Not implemented");
  }
}
