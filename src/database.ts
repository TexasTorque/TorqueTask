import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
  increment,
} from "firebase/firestore";
import { Task, TaskCounter } from "../client/src/data/Types";

import * as firebaseConfig from './config.json';
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const TASKS_COLLECTION = "tasks"

export const getAllTasks = async (): Promise<Task[]> => {
  const ref = collection(db, TASKS_COLLECTION);
  const snapshot = await getDocs(ref);
  const tasks: Task[] = [];
  snapshot.forEach((doc: any) => {
    tasks.push(doc.data());
  });
  return tasks;
};

const taskCounterRef = doc (db, "meta", "task-counter")

const getTaskCounter = async (): Promise<TaskCounter> => {
  console.log("getCount");
  const snapshot = await getDoc(taskCounterRef);
  return snapshot.data() as TaskCounter;
};

const incrementTaskCounter = async (): Promise<void> => {
  console.log("count++");
  await updateDoc(taskCounterRef, {
    count: increment(1)
  });
}

export const getNextIdentifier = async (): Promise<string> => {
  console.log("nextID");
  const tc = await getTaskCounter();
  return `${tc.identifier}-${tc.count}`;
}

export const updateTask = async (task: Task): Promise<void> => {
  console.log("updateTask");
  const ref = doc(db, TASKS_COLLECTION, task.identifier);
  if (!(await getDoc(ref)).exists())
    incrementTaskCounter();
  await setDoc(ref, task, { merge: true });
}

export const getTaskByID = async (id: string): Promise<Task | undefined> => {
  console.log("gtbID");
  const ref = doc(db, TASKS_COLLECTION, id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) 
    return undefined; 
  return snapshot.data() as Task;
}