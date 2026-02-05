import fs from "node:fs/promises";

export class FileServices<T> {
  constructor(public pathTheFile: string) {}

  async readFile(): Promise<T[]> {
    try {
      const fileText = await fs.readFile(this.pathTheFile, "utf-8");
      const parsedData: T[] = JSON.parse(fileText) as T[];
      return parsedData;
    } catch (error) {
      return []; // it's no best way for this example todo: manerjo de errores correcto eso que es
    }
  }

  async writeFile(object: T): Promise<void> {
    const records = await this.readFile();
    records.push(object);
    await fs.writeFile(this.pathTheFile, JSON.stringify(records));
  }
}
