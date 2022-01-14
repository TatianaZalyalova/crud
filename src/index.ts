import { create, read, updated, updatesType, del, filter } from "./crud-api";

const createTaskInput = document.getElementById("task") as HTMLInputElement;
const createTaskButton = document.getElementById("create") as HTMLButtonElement;

const readTaskIdInput = document.getElementById("iDtask") as HTMLInputElement;
const readTaskIdButton = document.getElementById("read") as HTMLButtonElement;
const deleteTaskIdButton = document.getElementById(
  "delete"
) as HTMLButtonElement;

const readTaskInput = document.getElementById("readTask") as HTMLInputElement;
const updateTaskButton = document.getElementById("update") as HTMLButtonElement;

createTaskButton.addEventListener(
  "click",
  createTask.bind(createTaskInput, "task", "tasks")
);
readTaskIdButton.addEventListener(
  "click",
  readTask.bind(readTaskIdInput, "task", "tasks")
);
updateTaskButton.addEventListener("click", updateTask.bind(readTaskInput));
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
  const data: any = await read(id, folder);
  if (data) {
    readTaskInput.value = data[key];
  }
}

function createTask(this: HTMLInputElement, key: string, folder: string) {
  const taskValue = this.value;
  create(key, taskValue, folder);
  this.value = "";
}

function updateTask(this: HTMLInputElement) {
  const newValue = this.value;
  const postdata = { task: newValue };
  const id = readTaskIdInput.value;
  const updates: updatesType = {};
  updates["/tasks/" + id] = postdata;
  updated(updates);
}

function deleteTask(this: HTMLInputElement, folder: string) {
  const id = this.value;
  del(id, folder);
}
