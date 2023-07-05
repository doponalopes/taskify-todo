export const types = {
  FETCH_ALL_TASKS: 'TASK/FETCH_ALL_TASKS',
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
  isLoading: false,
}

export function tasksReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_ALL_TASKS:
      return {
        ...state,
        tasks: action.payload
      }

    case types.REGISTER_NEW_TASK:
      return {
        ...state,
        isLoading: true
      }

    case types.SUCCESS_REGISTER_NEW_TASK:
      return {
        ...state,
        isLoading: false
      }

    default:
      return state
  }
}