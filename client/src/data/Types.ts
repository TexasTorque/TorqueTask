export enum Status {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  BLOCKED = "Blocked",
  CANCELED = "Canceled",
}

export enum Subteam {
  CAD = "CAD",
  MANUF = "Machining",
  MECH = "Mechanical",
  ELEC = "Electrical",
  PROG = "Programming",
  BIZ = "Business"
}

export enum Priority {
  HIGHEST = "↑↑",
  HIGH = "↑",
  MID = "―",
  LOW = "↓",
  LOWEST = "↓↓"
}

export interface Task {
  identifier: string;
  name: string;
  project: string;
  details: string;
  status: Status;
  createdOn: string;
  startDate: string;
  endDate: string;
  assignees: string[];
  subteam: Subteam;
  priority: Priority;
}

export const today = (offset: number = 0): Date => new Date(Date.now() + offset);
export const dateToStrISO = (d: Date): string => d.toISOString().substring(0, 10);
export const dateFromStrISO = (v: string) => new Date(v + "T12:00:00");
export const dateAdd = (s: string, t: number): string => dateToStrISO(new Date(new Date(s).getTime() + t));
export const oneDay = 1000 * 60 * 60 * 24;
export const timeDiff = (t: Task): number => (new Date(t.endDate)).getTime() - (new Date(t.startDate)).getTime();

export const defaultTask = { 
    identifier: "",
    name: "",
    project: "",
    details: "",
    status: Status.NOT_STARTED,
    createdOn: dateToStrISO(today()),
    startDate: dateToStrISO(today()),
    endDate: dateToStrISO(today(60 * 60 * 24 * 1000)),
    assignees: [],
    subteam: Subteam.PROG,
    priority: Priority.MID,
};

export interface TaskCounter {
  identifier: string;
  count: number;
}