import { FBCrud } from "./FBCrud";
import { IData } from "./Crud";

const fbCrud = new FBCrud();
let id: string;
let data: IData;
let filterTaskId;

describe("Firebase crud", () => {
  it("create and read task", async () => {
    id = await fbCrud.create("task", "task value", "test");
    data = await fbCrud.read(id, "test");
    expect(data.task).toBe("task value");
  });

  it("update task", async () => {
    const updates = {};
    const postdata = { task: "this task updated" };
    updates[`/test/${id}`] = postdata;
    await fbCrud.updated(updates);
    data = await fbCrud.read(`${id}`, "test");
    expect(data.task).toBe("this task updated");
  });

  it("filter task", async () => {
    filterTaskId = await fbCrud.create("task", "filter value", "test");
    const filterObj = await fbCrud.filter("test", "task", "filter value");
    expect(filterObj).toStrictEqual({
      [filterTaskId]: { task: "filter value" },
    });
  });

  it("delete task", async () => {
    fbCrud.del(id, "test");
    data = await fbCrud.read(id, "test");
    expect(data.task).toBe(undefined);
  });
});

afterAll(() => {
  return fbCrud.del("", "test");
});
