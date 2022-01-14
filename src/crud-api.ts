import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  update,
  remove,
  query,
  limitToLast,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBPoRUQFdGLDeIHigMHqrUSeIq1Tjp7EmM",
  authDomain: "fir-3e7a0.firebaseapp.com",
  projectId: "fir-3e7a0",
  storageBucket: "fir-3e7a0.appspot.com",
  messagingSenderId: "331771437353",
  appId: "1:331771437353:web:dee98366cb2a5579f55738",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export interface updatesType {
  [index: string]: updatesType | string;
}

export async function create(
  key: string,
  data: string,
  folder: string
): Promise<void> {
  const id = Math.random().toString(16).slice(2);
  set(ref(db, `${folder}/` + id), {
    task: data,
  });
}

export async function read(id: string, folder: string): Promise<any> {
  const dbRef = ref(db);
  let data: updatesType = {};
  await get(child(dbRef, `${folder}/${id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        data = snapshot.val();
        console.log(data);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
}

export function updated(updates: updatesType): Promise<void> {
  return update(ref(db), updates);
}

export function del(id: string, folder: string): void {
  remove(ref(db, `${folder}/${id}`));
}

export function filter(folder: string): any {
  return query(ref(db, `${folder}`), limitToLast(100));
}
