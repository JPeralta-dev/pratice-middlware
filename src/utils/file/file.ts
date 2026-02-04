import * as fs from "fs"; // usar fs/promises para no bloquear el event loop, además  import fs from 'node:fs'  es la manera correcta y en caso de promesas es import fs from 'node:fs/promises';
import { User } from "../../factures/user/interface/user"; // No se está utilizando

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
      return []; // it's no best way for this example todo: manerjo de errores correcto eso que es
    }
  }

  writeFile(object: any): any {
    /** fix: debe agregar como vectori y no como un json normal */
    try {
      const vector = this.readFile();
      vector.push(object);
      fs.writeFileSync(this.pathTheFile, JSON.stringify(vector));
    } catch (error) {
      return [error]; // TODOS:MANEJO DE ERRORES CORRECTO
    }
  }
}
