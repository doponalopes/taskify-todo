import {
  createContext,
  useEffect,
  useReducer,
  useState
} from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

import { auth } from '@services/firebase/config';

import { INITIAL_STATE, types, authReducer } from "@store/reducers/AuthReducer";

import { AuthContextTypes, UsersStatusType } from "types/authTypes";

import {
  changeUserOnline,
  registerUserAccess,
  searchUsersOnlineAndOffline
} from "@services/firebase/queries";

export const AuthContext = createContext<any>({});

export function AuthContextProvider({ children }: AuthContextTypes) {
  const [authState, dispatch] = useReducer(authReducer, INITIAL_STATE)
  const [isLoading, setIsLoading] = useState(true);

  const {
    onlineUsers,
    offlineUsers,
    allUsers,
    username,
    userId,
    isLoggedIn
  } = authState

  const userInformation = { username, userId, isLoggedIn }

  function login() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(result => {
        const { user } = result

        const payload = {
          userId: user.uid,
          username: user.displayName,
          isLoggedIn: true
        }

        dispatch({ type: types.LOGIN, payload })
      })
      .catch((error) =>
        console.log('error:', error)
      )
  }

  function logout() {
    changeUserOnlineOffline(userId, false)

    signOut(auth)
  }

  async function changeUserOnlineOffline(userId: string, isLoggedIn: boolean) {
    const uidUser = allUsers.filter(({ userId: id }: UsersStatusType) => id === userId)[0]?.id

    if (uidUser) {
      await changeUserOnline(uidUser, isLoggedIn)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const payload = {
          userId: user.uid,
          username: user.displayName,
          isLoggedIn: true
        }

        changeUserOnlineOffline(user.uid, true)
        dispatch({ type: types.LOGIN, payload })

      } else {
        dispatch({ type: types.LOGOUT })
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function registerUser() {
      const params = {
        userId,
        username,
        online: true
      }

      await registerUserAccess(params)
    }

    if (userId) {
      registerUser()
    }
  }, [userId])

  useEffect(() => {
    async function getUsersOnlineAndOffline() {
      await searchUsersOnlineAndOffline(response => {
        dispatch({
          type: types.SEARCH_USERS_ONLINE_AND_OFFLINE,
          payload: response
        })
      })
    }

    getUsersOnlineAndOffline()
  }, [])


  return (
    <AuthContext.Provider value={{
      login,
      logout,
      userInformation,
      onlineUsers,
      offlineUsers,
      allUsers,
      isLoading,
    }}>
      {children}
    </AuthContext.Provider >
  )
}