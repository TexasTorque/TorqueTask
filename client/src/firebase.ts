import { Task, defaultTask } from './data/Types'

const API_LOC: String = "http://localhost:3001/";

const fetch2 = async (endpt: string): Promise<any> => {
  return (await fetch(API_LOC + endpt)).json();
}

export const getAllTasks = async () => {
  return fetch2("getAllTasks");
};

export const getNextIdentifier = async (): Promise<string> => {
  return fetch2("getNextIdentifier");
}

// export const addTask = async (task: Task) => {
//   return (await fetch(apiLoc + "/addTask", {
//     method: "POST",
//     body: JSON.stringify(task),
//   })).json();
// }

export const taskTemplate = async (): Promise<Task> => {
  const task = defaultTask();
  task.identifier = await getNextIdentifier();
  return task;
}
