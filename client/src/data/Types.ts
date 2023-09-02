export enum Status {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "In Progress",
  BLOCKED = "Blocked",
  COMPLETED = "Completed",
}

export enum Subteam {
  CAD = "CAD",
  MANUF = "Machining",
  MECH = "Mechanical",
  ELEC = "Electrical",
  PROG = "Programming",
  BIZ = "Business"
}


export interface Task {
  identifier: string,
  name: string,
  project: string,
  details: string,
  status: Status,
  createdOn: Date,
  startDate: Date,
  endDate: Date,
  assigness: string[],
  subteam: string,
}

export const today = (offset: number = 0): Date => new Date(Date.now() + offset);

export const defaultTask = () => { 
  return {
    identifier: "",
    name: "",
    project: "",
    details: "",
    status: Status.NOT_STARTED,
    createdOn: today(),
    startDate: today(),
    endDate: today(60 * 60 * 24 * 1000),
    assigness: [],
    subteam: Subteam.PROG,
  }; 
}

export const dateToStrISO = (d: Date): string => d.toISOString().substring(0, 10);

export const dateFromStrISO = (v: string) => new Date(v + "T12:00:00");

export interface TaskCounter {
  identifier: string,
  count: number
}