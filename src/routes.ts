import * as firebase from "./firebase";

export const getTasks = async (req: any, res: any) => {
  res.json(await firebase.getTasks());
};
