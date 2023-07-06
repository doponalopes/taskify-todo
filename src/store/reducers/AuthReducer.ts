import { Action } from "types/authTypes"

export const types = {
  LOGIN: 'AUTH/LOGIN',
  LOGOUT: 'AUTH/LOGOUT'
} as const

export const INITIAL_STATE = {
  username: '',
  uid: '',
  isLoggedIn: false
}

export function authReducer(state = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        ...action.payload
      }

    case types.LOGOUT:
      return {
        ...INITIAL_STATE
      }

    default:
      return state
  }
}