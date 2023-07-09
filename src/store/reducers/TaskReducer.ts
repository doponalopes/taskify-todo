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

  APPLY_FILTER: 'TASK/APPLY_FILTER'
} as const

export const INITIAL_STATE = {
  allTasks: [] as TaskProps[],
  tasks: [] as TaskProps[],
  isLoadingFetch: true,
  isLoadingRegisterUpdate: false,
  selectTask: {} as TaskProps,
  deliveryDate: '',
  createdAt: '',
  ownerUid: '',
  researchField: '',
  visualization: 'all'
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

    case types.REMOVE_SELECTED_TASK:
      return {
        ...state,
        selectTask: {}
      }

    case types.APPLY_FILTER:
      let filteredList = state.allTasks

      const {
        deliveryDate,
        createdAt,
        ownerUid,
        visualization,
        researchField
      } = action.payload


      if (deliveryDate.toString().trim() !== '' ||
        createdAt.toString().trim() !== '' ||
        ownerUid !== '' || researchField.toString().trim() !== '' || visualization !== 'all') {
        filteredList = state.allTasks.filter((task: TaskProps) => {

          if (!task.title.toLowerCase().includes(researchField.toLowerCase())) {
            return false
          }

          if (visualization === 'inProgress' && task.completed) {
            return false
          }

          if (visualization === 'blocked' && !task.blocked) {
            return false
          }

          if (visualization === 'completed' && !task.completed) {
            return false
          }

          if (createdAt && task.createdAt !== createdAt) {
            return false;
          }

          if (deliveryDate && task.deliveryDate !== deliveryDate) {
            return false;
          }

          if (ownerUid && task.ownerUid !== ownerUid) {
            return false;
          }

          return true;
        })
      }

      return {
        ...state,
        tasks: filteredList,
        deliveryDate,
        createdAt,
        ownerUid,
        visualization,
        researchField
      }

    default:
      return state
  }
}