import { ICrudReposity } from "../../../interfaces/repository/repository";
import { FileServices } from "../../../utils/file/file";

import { typeUser } from "../interface/user";

export class RepositoryUser
  extends FileServices<typeUser>
  implements ICrudReposity<typeUser>
{
  private readonly utilsFiles: FileServices<typeUser>;
  constructor(public readonly pathTheFile: string) {
    super(pathTheFile);
    this.utilsFiles = new FileServices(this.pathTheFile);
  }

  async save(data: typeUser): Promise<void> {
    await this.utilsFiles.writeFile(data);
  }

  delete(id: string): typeUser {
    return { username: "", password: "" };
  }
  update(data: typeUser): typeUser {
    return { username: "", password: "" };
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
    return [{ username: "", password: "" }];
  }
}
