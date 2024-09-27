import { TaskState, TaskActions } from "@/app/@types/todoRecucer";

export const initialState: TaskState = [];

export const taskReducer = (state: TaskState, action: TaskActions): TaskState => {

  switch (action.type) {
 
    case "ADD": 
      const {payload}  = action

    return !Array.isArray(payload) ? [...state, payload] : payload;

    case "CHANGE":
      const changedTask = state.map((item, key) => {
        if(key == action.payload.index) {
          item.name = action.payload.name ?? item.name
          item.description = action.payload.description ?? item.description
          item.status = action.payload.status ?? item.status
        }
          return item
      })
    return changedTask;

    case "DELETE": 
      return state.filter((_item, key) => key != action.payload.index)

    default: 
      return state
  }

}