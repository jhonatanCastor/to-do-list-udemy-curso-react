'use client'
import { createContext, ReactNode, useReducer } from "react";
import { TaskActions, TaskState } from "../@types/todoRecucer";
import { initialState,taskReducer } from "./reducers/todoReducer";

type Props = {
  children?: ReactNode
};

type ContextType = {
  state: TaskState,
  dispatch: React.Dispatch<TaskActions>
};

export const TaskContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => null
});

export const TaskContextProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{state, dispatch}}>
      {children}
    </TaskContext.Provider>
  )
}