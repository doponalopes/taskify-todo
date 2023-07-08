import { Action, TaskProps } from "types/taskTypes"

export const types = {
  FETCH_ALL_TASKS: 'TASK/FETCH_ALL_TASKS',
  SUCCESS_FETCH_ALL_TASK: 'TASK/SUCCESS_FETCH_ALL_TASK',

  REGISTER_NEW_TASK: 'TASK/REGISTER_NEW_TASK',
  SUCCESS_REGISTER_NEW_TASK: 'TASK/SUCCESS_REGISTER_NEW_TASK',

  UPDATE_TASK: 'TASK/UPDATE_TASK',
  SUCCESS_UPDATE_TASK: 'TASK/SUCCESS_UPDATE_TASK',

  SELECT_TASK_TO_EDIT: 'TASK/SELECT_TASK_TO_EDIT',
  REMOVE_SELECTED_TASK: 'TASK/REMOVE_SELECTED_TASK',

  SEARCH_TASK: 'TASK/SEARCH_TASK',
  VISUALIZATION_TASK: 'TASK/VISUALIZATION_TASK'
} as const

export const INITIAL_STATE = {
  allTasks: [] as TaskProps[],
  tasks: [] as TaskProps[],
  isLoadingFetch: true,
  isLoadingRegisterUpdate: false,
  selectTask: {} as TaskProps,
}

export function tasksReducer(state: any, action: Action) {
  switch (action.type) {
    case types.FETCH_ALL_TASKS:
      return {
        ...state,
        isLoadingFetch: true
      }

    case types.SUCCESS_FETCH_ALL_TASK:
      return {
        ...state,
        allTasks: action.payload,
        tasks: action.payload,
        isLoadingFetch: false
      }

    case types.REGISTER_NEW_TASK:
      return {
        ...state,
        isLoadingRegisterUpdate: true
      }

    case types.SUCCESS_REGISTER_NEW_TASK:
      return {
        ...state,
        isLoadingRegisterUpdate: false
      }

    case types.UPDATE_TASK:
      return {
        ...state,
        isLoadingRegisterUpdate: true
      }

    case types.SUCCESS_UPDATE_TASK:
      return {
        ...state,
        isLoadingRegisterUpdate: false
      }

    case types.SELECT_TASK_TO_EDIT:
      const task = state.allTasks.filter(({ id }: TaskProps) => id === action.payload)[0]

      return {
        ...state,
        selectTask: task
      }

    case types.SEARCH_TASK:
      const filterBySearch = state.allTasks.filter((item: TaskProps) =>
        item.title.toLowerCase().includes(action.payload.toLowerCase())
      );

      return {
        ...state,
        tasks: filterBySearch
      }

    case types.VISUALIZATION_TASK:
      let filteredByView = state.allTasks

      if (action.payload === 'inProgress') {
        filteredByView = state.allTasks.filter((item: TaskProps) => !item.completed);
      }

      if (action.payload === 'completed') {
        filteredByView = state.allTasks.filter((item: TaskProps) => item.completed);
      }

      if (action.payload === 'blocked') {
        filteredByView = state.allTasks.filter((item: TaskProps) => item.blocked);
      }

      return {
        ...state,
        tasks: filteredByView
      }

    case types.REMOVE_SELECTED_TASK:
      return {
        ...state,
        selectTask: {}
      }

    default:
      return state
  }
}