import { Task, taskData } from './data/Types'

const apiLoc: String = "localhost:3001";

export const getTasks = async () => {
  return taskData;
  // return (await fetch(apiLoc + "/getTasks")).json();
};

export const addTask = async (task: Task) => {
  return (await fetch(apiLoc + "/addTask", {
    method: "POST",
    body: JSON.stringify(task),
  })).json();
}
