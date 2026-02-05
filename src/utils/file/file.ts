import fs from "node:fs/promises";

export class fileUtils {
  constructor(public pathTheFile: string) {
    this.pathTheFile = pathTheFile;
  }

  async readFile(): Promise<unknown[]> {
    try {
      const fileReaded = await fs.readFile(this.pathTheFile);
      const resultToString = fileReaded.toString();
      const parsedJson: [] = JSON.parse(resultToString);
      return parsedJson;
    } catch (error) {
      return []; // it's no best way for this example todo: manerjo de errores correcto eso que es
    }
  }

  async writeFile(object: unknown): Promise<void> {
    const vector = await this.readFile();
    vector.push(object);
    fs.writeFile(this.pathTheFile, JSON.stringify(vector));
  }
}
