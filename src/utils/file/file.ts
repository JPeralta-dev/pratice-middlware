import fs from "node:fs/promises";

export class FileServices<T> {
  constructor(public pathTheFile: string) {
    this.pathTheFile = pathTheFile;
  }

  async readFile(): Promise<T[]> {
    try {
      const fileContent = await fs.readFile(this.pathTheFile);
      const fileText = fileContent.toString();
      const parsedData: T[] = JSON.parse(fileText) as T[];
      return parsedData;
    } catch (error) {
      return []; // it's no best way for this example todo: manerjo de errores correcto eso que es
    }
  }

  async writeFile(object: T): Promise<void> {
    const records = await this.readFile();
    records.push(object);
    fs.writeFile(this.pathTheFile, JSON.stringify(records));
  }
}
