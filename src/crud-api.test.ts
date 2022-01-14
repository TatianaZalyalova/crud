import { create, read, updated, del } from "./crud-api";

describe("crud", () => {
  it("create task", () => {
    create("test", "task value", "tasks");
  });

  it("read task", async () => {
    const data = await read("988019ff847ab", "tasks");
    expect(data.constructor).toEqual(Object);
    expect(data.task).toBe("555");
  });

  it("update task", async () => {
    const updates = {};
    const postdata = { task: "this task updated" };
    updates["/tasks/8367b78f0285a"] = postdata;
    await updated(updates);
    const data = await read("8367b78f0285a", "tasks");
    expect(data.task).toBe("this task updated");
  });

  it("delete task", async () => {
    del("507098fd9e437", "tasks");
    const data = await read("507098fd9e437", "tasks");
    expect(data.task).toBe(undefined);
  });
});
