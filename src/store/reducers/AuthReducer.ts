export const types = {
  LOGIN: 'AUTH/LOGIN',
  LOGOUT: 'AUTH/LOGOUT'
}

export const INITIAL_STATE = {
  username: '',
  uid: '',
  isLoggedIn: false
}

export function authReducer(state = INITIAL_STATE, action) {
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