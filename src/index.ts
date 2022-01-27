import { FBCrud } from "./FBCrud";
import { LSCrud } from "./LSCrud";
import { IData } from "./Crud";

const createTaskInput = document.getElementById("task") as HTMLInputElement;
const createTaskButton = document.getElementById("create") as HTMLButtonElement;

const readTaskIdInput = document.getElementById("iDtask") as HTMLInputElement;
const readTaskIdButton = document.getElementById("read") as HTMLButtonElement;
const deleteTaskIdButton = document.getElementById(
  "delete"
) as HTMLButtonElement;

const readTaskInput = document.getElementById("readTask") as HTMLInputElement;
const updateTaskButton = document.getElementById("update") as HTMLButtonElement;

const crud = new FBCrud();
const crudLs = new LSCrud();

createTaskButton.addEventListener(
  "click",
  createTask.bind(createTaskInput, "task", "tasks")
);
readTaskIdButton.addEventListener(
  "click",
  readTask.bind(readTaskIdInput, "task", "tasks")
);
updateTaskButton.addEventListener(
  "click",
  updateTask.bind(readTaskInput, "tasks")
);
deleteTaskIdButton.addEventListener(
  "click",
  deleteTask.bind(readTaskIdInput, "tasks")
);

async function readTask(
  this: HTMLInputElement,
  key: string,
  folder: string
): Promise<void> {
  const id = this.value;
  const data: any = await crud.read(id, folder);
  if (data) {
    readTaskInput.value = data[key];
  }
}

function createTask(this: HTMLInputElement, key: string, folder: string) {
  const taskValue = this.value;
  //crud.create(key, taskValue, folder);
  if (taskValue) {
    crudLs.create(key, taskValue, folder);
    this.value = "";
  }
}

function updateTask(this: HTMLInputElement, path: string) {
  const newValue = this.value;
  const postdata = { task: newValue };
  const id = readTaskIdInput.value;
  const updates: IData = {};
  // updates["/tasks/" + id] = postdata;
  //crud.updated(updates);
  updates[id] = postdata;
  crudLs.updated(updates, path);
}

function deleteTask(this: HTMLInputElement, folder: string) {
  const id = this.value;
  crud.del(id, folder);
  crudLs.del(id, folder);
}
