import { Models } from "node-appwrite";

export enum TaskStatus {
  BACKLOG = "BACKLOG",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  IN_REVIEW = "IN_REVIEW",
  TODO = "TODO",
}

export type Task = Models.Document & {
  name: string;
  status: TaskStatus;
  assigneeId: string;
  workspaceId: string;
  projectId: string;
  position: number;
  dueDate: string;
};
