export enum Status {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "In Progress",
  BLOCKED = "Blocked",
  COMPLETED = "Completed",
}

export interface Task {
  name: string,
  summary: string,
  status: Status,
  createdAt: Date,
  startDate: Date,
  endDate: Date,
  assigness: string[],
}

const dateNow = () => new Date(Date.now());

export const taskData: Task[] = [
  {
    name: "Eat cake",
    summary: "Eat the Mr Rip birthday cake",
    status: Status.NOT_STARTED,
    createdAt: dateNow(),
    startDate: dateNow(),
    endDate: dateNow(),
    assigness: ["Omar", "Daveys", "Justus", "Rohan"],
  },
  {
    name: "Have a pizza PARTY",
    summary: "Geet that brothers pizza and have a party!!!",
    status: Status.NOT_STARTED,
    createdAt: dateNow(),
    startDate: dateNow(),
    endDate: dateNow(),
    assigness: ["Omar", "Daveys", "Justus", "Rohan"],
  }
]