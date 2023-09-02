import { Task, defaultTask } from './data/Types'

const api = (x: String): string => "http://localhost:3001/" + x;

export const getAllTasks = async (): Promise<Task[]> => {
  return (await fetch(api("getAllTasks"))).json() as Promise<Task[]>;
};

export const getNextIdentifier = async (): Promise<string> => {
  return (await fetch(api("getNextIdentifier"))).json();
}

export const taskTemplate = async (): Promise<Task> => {
  const task = defaultTask();
  task.identifier = await getNextIdentifier();
  return task;
}

export const updateTask = async (task: Task): Promise<Response> => {
  return await fetch(api("updateTask"), {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  });
}
