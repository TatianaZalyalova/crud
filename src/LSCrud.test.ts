import { LSCrud } from "./LSCrud";
import { IData } from "./Crud";

const lsCrud = new LSCrud();
let id: string;
let data: IData;
let filterTaskId;

describe("LocalStorage crud", () => {
  it("create and read task", async () => {
    id = await lsCrud.create("task", "task value", "test");
    data = await lsCrud.read(id, "test");
    expect(data.task).toBe("task value");
  });

  it("update task", async () => {
    const updates = {};
    const postdata = { task: "this task updated" };
    updates[id] = postdata;
    await lsCrud.updated(updates, "test");
    data = await lsCrud.read(`${id}`, "test");
    expect(data.task).toBe("this task updated");
  });

  it("filter task", async () => {
    filterTaskId = await lsCrud.create("task", "filter value", "test");
    const filterObj = await lsCrud.filter("test", "task", "filter value");
    expect(filterObj).toStrictEqual({
      [filterTaskId]: { task: "filter value" },
    });
  });

  it("delete task", async () => {
    await lsCrud.del(id, "test");
    data = await lsCrud.read(id, "test");
    expect(data).toBe(undefined);
  });
});

afterAll(() => {
  return lsCrud.del("", "test");
});
