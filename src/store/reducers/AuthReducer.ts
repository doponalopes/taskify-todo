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
  offlineUsers: [],
  allUsers: []
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
      const allUsers = action.payload

      const onlineUsers = allUsers.filter((user: UsersStatusType) => user.online)
      const offlineUsers = allUsers.filter((user: UsersStatusType) => !user.online)

      return {
        ...state,
        onlineUsers,
        offlineUsers,
        allUsers
      }

    default:
      return state
  }
}