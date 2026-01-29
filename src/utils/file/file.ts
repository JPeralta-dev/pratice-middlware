import * as fs from "fs";
import { User } from "../../factures/user/interface/user";

export class fileUtils {
  constructor(public pathTheFile: string) {
    this.pathTheFile = pathTheFile;
  }

  readFile(): any[] {
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
    /** fix: debe agregar como vectori y no como un json normal */
    try {
      const vector = this.readFile();
      vector.push(object);
      fs.writeFileSync(this.pathTheFile, JSON.stringify(vector));
      console.log("mira aqui llego veamos si funciono");
    } catch (error) {
      return [error]; // TODOS:MANEJO DE ERRORES CORRECTO
    }
  }
}
