export const types = {
  FETCH_ALL_TASKS: 'TASK/FETCH_ALL_TASKS',
}

export type TaskProps = {
  id: string;
  title: string;
  text: string;
  onwerName: string;
  ownerUid: string;
  createdAt: number;
  deliveryDate: number;
  nameUser: string;
  blocked: boolean;
  completed: boolean;
}

export const INITIAL_STATE = {
  tasks: [] as TaskProps[]
}

export function tasksReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_ALL_TASKS:
      return {
        ...state,
        tasks: action.payload
      }

    default:
      return state
  }
}