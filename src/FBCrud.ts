import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  update,
  remove,
  push,
} from "firebase/database";
import { Crud, IData } from "./Crud";

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

export class FBCrud extends Crud {
  create = async (key: string, data: string, path: string) => {
    const postListRef = ref(db, `${path}/`);
    const newPostRef = push(postListRef);
    await set(newPostRef, {
      [key]: data,
    });
    return newPostRef.key;
  };

  read = async (id: string, path: string) => {
    const dbRef = ref(db);
    let data: IData = {};
    await get(child(dbRef, `${path}/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          data = snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return data;
  };

  updated = async (updates: IData) => {
    return update(ref(db), updates);
  };

  del = async (id: string, folder: string) => {
    await remove(ref(db, `${folder}/${id}`));
  };

  filter = async (folder: string, keyFilter: string, value: string) => {
    const filterTasksObj: any = await this.read("", folder);
    for (let key in filterTasksObj) {
      if (filterTasksObj[key][keyFilter] !== value) {
        delete filterTasksObj[key];
      }
    }
    return filterTasksObj;
  };
}
