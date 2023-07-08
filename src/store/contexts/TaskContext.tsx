import {
  createContext,
  useEffect,
  useReducer
} from "react";

import { INITIAL_STATE, tasksReducer, types } from "@store/reducers/TaskReducer";

import {
  createTask,
  updateTask,
  fetchAllTask,
  changeTaskStatus,
  removeTask
} from "@services/firebase/queries";
import { RegisterUpdateTaskTypes, TaskContextTypes, TaskFilterTypes } from "types/taskTypes";

export const TaskContext = createContext<any>({});

export function TaskContextProvider({ children }: TaskContextTypes) {
  const [tasksState, dispatch] = useReducer(tasksReducer, INITIAL_STATE)

  const {
    tasks,
    isLoadingFetch,
    isLoadingRegisterUpdate,
    selectTask,
    deliveryDate,
    createdAt,
    ownerUid,
    researchField,
    visualization,
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

  async function registerNewTaskHandler(data: RegisterUpdateTaskTypes) {
    dispatch({ type: types.REGISTER_NEW_TASK })

    try {
      await createTask(data)
    } catch (error) {

    } finally {
      dispatch({ type: types.SUCCESS_REGISTER_NEW_TASK })
    }
  }

  function selectTaskToEditHandler(id: string) {
    dispatch({ type: types.SELECT_TASK_TO_EDIT, payload: id })
  }

  function removeSelectedTaskHandler() {
    dispatch({ type: types.REMOVE_SELECTED_TASK })
  }

  async function updateTaskHandler(id: string, data: RegisterUpdateTaskTypes) {
    dispatch({ type: types.UPDATE_TASK })

    try {
      await updateTask(id, data)
    } catch (error) {

    } finally {
      dispatch({ type: types.SUCCESS_UPDATE_TASK })
    }
  }

  async function changeTaskStatusHandler(id: string, data: boolean) {
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

  function searchTaskHandler(text: string) {
    dispatch({ type: types.SEARCH_TASK, payload: text })
  }

  function visualizationTaskHandler(type: string) {
    dispatch({ type: types.VISUALIZATION_TASK, payload: type })
  }

  function applyFilterHandler(payload: TaskFilterTypes) {
    dispatch({ type: types.APPLY_FILTER, payload })
  }

  return (
    <TaskContext.Provider value={{
      tasks,
      isLoadingFetch,
      isLoadingRegisterUpdate,
      selectTask,
      deliveryDate,
      createdAt,
      ownerUid,
      researchField,
      visualization,
      registerNewTaskHandler,
      selectTaskToEditHandler,
      removeSelectedTaskHandler,
      updateTaskHandler,
      changeTaskStatusHandler,
      removeTaskHandler,
      searchTaskHandler,
      visualizationTaskHandler,
      applyFilterHandler
    }}>
      {children}
    </TaskContext.Provider>
  )
}