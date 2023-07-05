import {
  ReactNode,
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

import { INITIAL_STATE, types, authReducer } from "../reducers/AuthReducer";

import { auth } from '../../services/firebase/config';

type Props = {
  children: ReactNode
}

function mountAuthPayload(user, isLoggedIn) {
  return {
    uid: user.uid,
    username: user.displayName,
    isLoggedIn
  }
}

export const AuthContext = createContext({});

export function AuthContextProvider({ children }: Props) {
  const [authState, dispatch] = useReducer(authReducer, INITIAL_STATE)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const payload = mountAuthPayload(user, true)

        dispatch({ type: types.LOGIN, payload })
      } else {
        dispatch({ type: types.LOGOUT })
      }

      setIsLoading(false);
    });


    return () => unsubscribe();
  }, []);

  function login() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(result => {
        const payload = mountAuthPayload(result.user, true)

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
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}