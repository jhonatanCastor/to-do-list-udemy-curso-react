import { Task } from "./todo";

export type TaskState = Task[];

type TaskWithOptionalProps = {
  [key in keyof Task]: Task[key];
}

type AddTask = {
  type: "ADD",
  payload: Task | Task[];
};

type ChangeTask = {
  type: "CHANGE",
  payload: TaskWithOptionalProps & {index: number}
}

type DeleteTodo = {
  type: "DELETE",
  payload: {index: number}
}

export type TaskActions = AddTask | ChangeTask | DeleteTodo