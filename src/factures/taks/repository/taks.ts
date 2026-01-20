import { ICrudReposity } from "../../../interfaces/Repository/repository";
import { fileUtils } from "../../../utils/file/file";
import { Taks } from "../entity/taks";

export class repositoryTaks extends fileUtils implements ICrudReposity<Taks> {
  private readonly utilsFiles: fileUtils;
  constructor(public readonly pathTheFile: string) {
    super(pathTheFile);
    this.utilsFiles = new fileUtils(this.pathTheFile);
  }
  save(data: Taks): void {
    this.utilsFiles.writeFile(data);
  }

  delete(id: string): Taks {
    return new Taks("", "", "", true, 1, 1, "2");
  }
  update(data: Taks): Taks {
    return new Taks("", "", "", true, 1, 1, "2");
  }

  findById(id: string): Taks {
    const vector = this.utilsFiles.readFile();

    const result = vector.find((value) => value.username === id);

    if (!result) {
      console.log("estoy aca");

      return new Taks("", "", "", true, 1, 1, "2");
    }

    return new Taks("", "", "", true, 1, 1, "2");
  }

  find(): [Taks] {
    return [new Taks("", "", "", true, 1, 1, "2")];
  }
}
