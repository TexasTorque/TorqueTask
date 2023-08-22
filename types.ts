export const Statuses = {
  statuses: [
    {
      name: String,
      color: String
    }
  ],
  currentStatus: String,
};

export const Task = {
  name: String,
  summary: String,
  statuses: Statuses,
  createdAt: Number,
  startDate: String,
  assigness: [String],
};
