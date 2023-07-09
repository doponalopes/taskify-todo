import { createContext, useState } from "react";

import { ErrorTypes } from "types/ErrorTypes";

export const ErrorContext = createContext<any>({})

export function ErrorContextProvider({ children }: ErrorTypes) {
  const [error, setError] = useState('')

  function changeError(error: string) {
    setError(error)
  }

  return (
    <ErrorContext.Provider value={{ error, changeError }}>
      {children}
    </ErrorContext.Provider>
  )
}