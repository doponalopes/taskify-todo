import {
  ReactNode,
  createContext,
  useEffect,
  useReducer
} from "react";

import { INITIAL_STATE, tasksReducer, types } from "@store/reducers/TaskReducer";

import { createTask, fetchAllTask } from "@services/firebase/queries";

type Props = {
  children: ReactNode
}

export const TaskContext = createContext({});

export function TaskContextProvider({ children }: Props) {
  const [tasksState, dispatch] = useReducer(tasksReducer, INITIAL_STATE)

  useEffect(() => {
    async function getAllTasks() {
      dispatch({ type: types.FETCH_ALL_TASKS })

      const response = await fetchAllTask();

      dispatch({ type: types.SUCCESS_FETCH_ALL_TASK, payload: response })
    }

    getAllTasks();
  }, []);

  async function registerNewTask(data) {
    dispatch({ type: types.REGISTER_NEW_TASK })

    try {
      await createTask(data)
    } catch (error) {

    } finally {
      dispatch({ type: types.SUCCESS_REGISTER_NEW_TASK })
    }
  }

  return (
    <TaskContext.Provider value={{
      allTasks: tasksState.tasks,
      isLoadingFetch: tasksState.isLoadingFetch,
      registerNewTask
    }}>
      {children}
    </TaskContext.Provider>
  )
}