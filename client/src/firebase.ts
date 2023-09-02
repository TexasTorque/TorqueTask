import { Task, taskData } from './data/Types'

const API_LOC: String = "http://localhost:3001/";

const fetch2 = async (endpt: string): Promise<any> => {
  return (await fetch(API_LOC + endpt)).json();
}

export const getTasks = async () => {
  return fetch2("getTasks");
};

// export const addTask = async (task: Task) => {
//   return (await fetch(apiLoc + "/addTask", {
//     method: "POST",
//     body: JSON.stringify(task),
//   })).json();
// }
