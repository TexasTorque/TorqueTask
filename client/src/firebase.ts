const apiLoc: String = "localhost:3001";

export const getTasks = async () => {
  return (await fetch(apiLoc + "/getTasks")).json();
};
