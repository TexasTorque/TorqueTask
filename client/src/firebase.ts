import { Task, defaultTask } from './data/Types'

const PROD_SERVER_ADRESS = "https://torque-task.onrender.com";
const TEST_SERVER_ADRESS = "http://localhost:3001";

const serverAdresses = {
  'production': TEST_SERVER_ADRESS,
  'development': PROD_SERVER_ADRESS,
  'test': TEST_SERVER_ADRESS
};

const api = (x: String): string => serverAdresses[process.env.NODE_ENV] + "/" + x;

export const getAllTasks = async (): Promise<Task[]> => {
  return (await fetch(api("getAllTasks"))).json() as Promise<Task[]>;
};

export const getNextIdentifier = async (): Promise<string> => {
  return (await fetch(api("getNextIdentifier"))).json();
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

export const getTaskByID = async (id: string): Promise<Task> => {
  const res = await fetch(api("getTaskByID?id=" + id))
  if (!res.ok) {
    window.location.href = "/new";
  }
  return res.json() as Promise<Task>;
}
