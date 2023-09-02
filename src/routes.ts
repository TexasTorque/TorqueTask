import * as database from "./database";

export const getAllTasks = async (req: any, res: any) => {
  res.json(await database.getAllTasks());
};

export const getNextIdentifier = async (req: any, res: any) => {
  res.json(await database.getNextIdentifier());
};