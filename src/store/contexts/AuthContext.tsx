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

import { INITIAL_STATE, types, authReducer } from "@store/reducers/AuthReducer";

import { AuthContextTypes } from "types/authTypes";

import { auth } from '@services/firebase/config';
import { searchUsersOnlineAndOffline } from "@services/firebase/queries";

export const AuthContext = createContext<any>({});

export function AuthContextProvider({ children }: AuthContextTypes) {
  const [authState, dispatch] = useReducer(authReducer, INITIAL_STATE)
  const [isLoading, setIsLoading] = useState(true);

  const { onlineUsers, offlineUsers, allUsers } = authState

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const payload = {
          uid: user.uid,
          username: user.displayName,
          isLoggedIn: true
        }

        dispatch({ type: types.LOGIN, payload })
      } else {
        dispatch({ type: types.LOGOUT })
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);


  useEffect(() => {
    async function getUsersOnlineAndOffline() {
      await searchUsersOnlineAndOffline(response => {
        dispatch({ type: types.SEARCH_USERS_ONLINE_AND_OFFLINE, payload: response })
      })
    }

    getUsersOnlineAndOffline()
  }, [])

  function login() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(result => {
        const { user } = result

        const payload = {
          uid: user.uid,
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
    signOut(auth)
  }

  return (
    <AuthContext.Provider value={{
      login,
      logout,
      userInformation: authState,
      onlineUsers,
      offlineUsers,
      allUsers,
      isLoading,
    }}>
      {children}
    </AuthContext.Provider >
  )
}