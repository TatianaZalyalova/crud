export interface IData {
  [index: string]: {
    task: string;
    date?: string;
    tags?: string[];
    status?: string;
  };
}

export abstract class Crud {
  abstract create(
    key: string,
    data: string,
    path: string
  ): Promise<string | null>;
  abstract read(id: string, path: string): Promise<IData>;
  abstract updated(updates: IData, path?: string): Promise<void>;
  abstract del(id: string, path: string): Promise<void>;
  abstract filter(
    folder: string,
    keyFilter: string,
    value: string
  ): Promise<IData>;
}
