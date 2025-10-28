export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "backlog" | "todo" | "in-progress" | "done";
  createdAt: number;
}

export type ColumnStatus = Task["status"]; 
export const COLUMN_STATUSES: ColumnStatus[] = [
  "backlog",
  "todo",
  "in-progress",
  "done",
];