import { Home } from "./pages/Home";
import { Header } from "./components";

import { ErrorContextProvider } from "store/contexts/ErrorContext";
import { AuthContextProvider } from "store/contexts/AuthContext";
import { TaskContextProvider } from "store/contexts/TaskContext";

export function App() {
  return (
    <ErrorContextProvider>
      <AuthContextProvider>
        <Header />

        <TaskContextProvider>
          <Home />
        </TaskContextProvider>
      </AuthContextProvider>
    </ErrorContextProvider>
  )
}