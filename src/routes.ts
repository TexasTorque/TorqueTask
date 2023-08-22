import * as firebase from "./firebase.js";

export const getTasks = async (req: any, res: any) => {
  res.json(await firebase.getTasks());
};
