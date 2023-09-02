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
import { Task } from "../client/src/data/Types";

const firebaseConfig = {
  apiKey: "AIzaSyAsH5ev1GqVtpNd_u3VTEE1LCsRoiCYCTA",
  authDomain: "torquetask.firebaseapp.com",
  projectId: "torquetask",
  storageBucket: "torquetask.appspot.com",
  messagingSenderId: "416680937681",
  appId: "1:416680937681:web:44bf69c0743123b5381df0",
  measurementId: "G-67QYW1BC9Q",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getTasks = async (): Promise< Task[]> => {
  const tasksRef = collection(db, "tasks");
  const tasksSnapshot = await getDocs(tasksRef);
  const tasks:  Task[] = [];
  tasksSnapshot.forEach((doc: any) => {
    tasks[doc.id] = doc.data();
  });
  return tasks;
};
