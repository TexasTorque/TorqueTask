import { Task } from "../client/src/data/Types";
import * as database from "./database";

import {Request, Response} from 'express';

export const getAllTasks = async (req: Request, res: Response) => {
  res.json(await database.getAllTasks());
};

export const getNextIdentifier = async (req: Request, res: Response) => {
  res.json(await database.getNextIdentifier());
};

export const updateTask = async (req: Request, res: Response) => {
  const task = req.body as Task;
  await database.updateTask(task);
  res.json({});
}

var ngtbid = 0;

export const getTaskByID = async (req: Request, res: Response) => {
  console.log(ngtbid++);
  const t = await database.getTaskByID(req.query.id as string);
  if (t === undefined)
    res.sendStatus(500);
    // res.redirect("/new");
  res.json(t);
};
