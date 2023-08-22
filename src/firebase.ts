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
} from "firebase/firestore";
import { Task } from "../types";



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getTasks = async (): Promise<typeof Task[]> => {
  const tasksRef = collection(db, "tasks");
  const tasksSnapshot = await getDocs(tasksRef);
  const tasks: typeof Task[] = [];
  tasksSnapshot.forEach((doc: any) => {
    tasks[doc.id] = doc.data();
  });
  return tasks;
};
