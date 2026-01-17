import * as fs from "fs";
import { User } from "../../factures/user/interface/user";

export class fileUtils {
  constructor(public pathTheFile: string) {
    this.pathTheFile = pathTheFile;
  }

  readFile(): User[] {
    try {
      const fileReaded = fs.readFileSync(this.pathTheFile);
      const resultToString = fileReaded.toString();
      const parsedJson: [] = JSON.parse(resultToString);
      return parsedJson;
    } catch (error) {
      return []; // it's no best way for this example
    }
  }

  writeFile(object: any): any {
    try {
      fs.writeFileSync(
        this.pathTheFile,
        /* revisar que esto no embarrre el proceso */ JSON.stringify(object),
      );
      console.log("mira aqui llego veamos si funciono");
    } catch (error) {
      return [error];
    }
  }
}
