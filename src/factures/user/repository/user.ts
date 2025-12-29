import { ICrudReposity } from "../../../interfaces/Repository/repository";
import { fileUtils } from "../../../utils/file/file";
import { User } from "../interface/user";

export class RepositoryUser extends fileUtils implements ICrudReposity<User> {
  private readonly utilsFiles: fileUtils;
  constructor(public readonly pathTheFile: string) {
    super(pathTheFile);
    this.utilsFiles = new fileUtils(this.pathTheFile);
  }

  save(data: User): void {}

  delete(id: string): User {
    return { username: "", password: "" };
  }

  update(data: User): User {
    return { username: "", password: "" };
  }

  findById(id: string): User {
    const vector = this.utilsFiles.readFile();
    const result = vector.find((value) => value.username === id);
    console.log(result);

    return result as User;
  }

  find(): [User] {
    return [{ username: "", password: "" }];
  }
}
