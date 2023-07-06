import {
  ReactNode,
  createContext,
  useEffect,
  useReducer
} from "react";

import { INITIAL_STATE, tasksReducer, types } from "@store/reducers/TaskReducer";

import { createTask, updateTask, fetchAllTask, changeTaskStatus, removeTask } from "@services/firebase/queries";

type Props = {
  children: ReactNode
}

export const TaskContext = createContext({});

export function TaskContextProvider({ children }: Props) {
  const [tasksState, dispatch] = useReducer(tasksReducer, INITIAL_STATE)

  const {
    allTasks,
    isLoadingFetch,
    isLoadingRegisterUpdate,
    selectTask
  } = tasksState

  useEffect(() => {
    async function getAllTasks() {
      dispatch({ type: types.FETCH_ALL_TASKS })

      await fetchAllTask((response) => {
        dispatch({ type: types.SUCCESS_FETCH_ALL_TASK, payload: response })
      });
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

  function selectTaskToEdit(id: string) {
    dispatch({ type: types.SELECT_TASK_TO_EDIT, payload: id })
  }

  function removeSelectedTask() {
    dispatch({ type: types.REMOVE_SELECTED_TASK })
  }

  async function updateTaskHandler(id: string, data) {
    dispatch({ type: types.UPDATE_TASK })

    try {
      await updateTask(id, data)
    } catch (error) {

    } finally {
      dispatch({ type: types.SUCCESS_UPDATE_TASK })
    }
  }

  async function changeTaskStatusHandler(id: string, data) {
    try {
      await changeTaskStatus(id, data)
    } catch (error) {

    } finally {
    }
  }

  async function removeTaskHandler(id: string) {
    try {
      await removeTask(id)
    } catch (error) {

    } finally {
    }
  }

  return (
    <TaskContext.Provider value={{
      allTasks,
      isLoadingFetch,
      isLoadingRegisterUpdate,
      selectTask,
      registerNewTask,
      selectTaskToEdit,
      removeSelectedTask,
      updateTaskHandler,
      changeTaskStatusHandler,
      removeTaskHandler
    }}>
      {children}
    </TaskContext.Provider>
  )
}