import { ICrudReposity } from "../../../interfaces/repository/repository";
import { fileUtils } from "../../../utils/file/file";
import { User } from "../entity/User";

export class RepositoryUser extends fileUtils implements ICrudReposity<User> {
  private readonly utilsFiles: fileUtils;
  constructor(public readonly pathTheFile: string) {
    super(pathTheFile);
    this.utilsFiles = new fileUtils(this.pathTheFile);
  }

  async save(data: User): Promise<void> {
    await this.utilsFiles.writeFile(data);
  }

  delete(id: string): User {
    return new User("", "");
  }
  update(data: User): User {
    return new User("", "");
  }

  async findById(id: string): Promise<User> {
    const vector = await this.utilsFiles.readFile();
    console.log(vector);

    const result = vector.find((value) => value.username === id);

    if (!result) {
      return new User("", "");
    }

    return new User(result.username, result.password);
  }

  find(): [User] {
    return [new User("", "")];
  }
}
