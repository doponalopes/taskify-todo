import { Action, UsersStatusType } from "types/authTypes"

export const types = {
  LOGIN: 'AUTH/LOGIN',
  LOGOUT: 'AUTH/LOGOUT',
  SEARCH_USERS_ONLINE_AND_OFFLINE: 'AUTH/SEARCH_USERS_ONLINE_AND_OFFLINE'
} as const

export const INITIAL_STATE = {
  username: '',
  uid: '',
  isLoggedIn: false,
  onlineUsers: [],
  offlineUsers: []
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

    case types.SEARCH_USERS_ONLINE_AND_OFFLINE:
      const onlineUsers = action.payload.filter((user: UsersStatusType) => user.online)
      const offlineUsers = action.payload.filter((user: UsersStatusType) => !user.online)

      return {
        ...state,
        onlineUsers,
        offlineUsers
      }

    default:
      return state
  }
}