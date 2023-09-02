import * as database from "./database";

export const getAllTasks = async (req: any, res: any) => {
  res.json(await database.getAllTasks());
};
