import { Crud, IData } from "./Crud";

export class LSCrud extends Crud {
  create = async (key: string, data: string, path: string) => {
    const dataObj = await this.get(path);
    const id = Math.random().toString(16).slice(2);
    dataObj[id] = { [key]: data };
    localStorage.setItem(path, JSON.stringify(dataObj));
    return id;
  };

  read = async (id: string, path: string) => {
    const data = await this.get(path);
    return data[id];
  };

  updated = async (updates: IData, path: string) => {
    const updatedPath = await this.get(path);
    for (let key in updates) {
      if (key in updatedPath) {
        updatedPath[key] = updates[key];
      }
    }
    localStorage.setItem(path, JSON.stringify(updatedPath));
  };

  del = async (id: string, path: string) => {
    const result = await this.get(path);
    if (result[id]) {
      delete result[id];
    }
    localStorage.setItem(path, JSON.stringify(result));
  };

  get = async (path: string) => {
    const result = localStorage.getItem(path);
    if (result === null) {
      return {};
    }
    const resultObj = await JSON.parse(result);
    return resultObj;
  };

  filter = async (path: string, keyFilter: string, value: string) => {
    const filterTasksObj = await this.get(path);
    for (let key in filterTasksObj) {
      if (filterTasksObj[key][keyFilter] !== value) {
        delete filterTasksObj[key];
      }
    }
    return filterTasksObj;
  };
}
