import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState
} from "react";

import { INITIAL_STATE, tasksReducer, types } from "../reducers/TaskReducer";

import { fetchAllTask } from "../../services/firebase/queries";

type Props = {
  children: ReactNode
}

export const TaskContext = createContext({});

export function TaskContextProvider({ children }: Props) {
  const [tasksState, dispatch] = useReducer(tasksReducer, INITIAL_STATE)

  useEffect(() => {
    async function getAllTasks() {
      try {
        const response = await fetchAllTask();

        dispatch({ type: types.FETCH_ALL_TASKS, payload: response })
      } catch (error) {
      } finally {

      }
    }

    getAllTasks();
  }, []);

  return (
    <TaskContext.Provider value={{
      allTasks: tasksState.tasks
    }}>
      {children}
    </TaskContext.Provider>
  )
}