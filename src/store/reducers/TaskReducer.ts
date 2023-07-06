export const types = {
  FETCH_ALL_TASKS: 'TASK/FETCH_ALL_TASKS',
  SUCCESS_FETCH_ALL_TASK: 'TASK/SUCCESS_FETCH_ALL_TASK',

  REGISTER_NEW_TASK: 'TASK/REGISTER_NEW_TASK',
  SUCCESS_REGISTER_NEW_TASK: 'TASK/SUCCESS_REGISTER_NEW_TASK'
}

export type TaskProps = {
  id: string;
  title: string;
  text: string;
  onwerName: string;
  ownerUid: string;
  createdAt: number;
  deliveryDate: number;
  blocked: boolean;
  completed: boolean;
}

export const INITIAL_STATE = {
  tasks: [] as TaskProps[],
  isLoadingFetch: true,
  isLoadingRegisterUpdate: false
}

export function tasksReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_ALL_TASKS:
      return {
        ...state,
        isLoadingFetch: true
      }

    case types.SUCCESS_FETCH_ALL_TASK:
      return {
        ...state,
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

    default:
      return state
  }
}