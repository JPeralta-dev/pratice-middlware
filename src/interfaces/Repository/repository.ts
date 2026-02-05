export interface ICrudReposity<T> {
  save: (data: T) => void;
  delete: (id: string) => T;
  update: (data: T) => T;
  findById: (id: string) => Promise<T | undefined>;
  find: () => Promise<T[]>;
}
