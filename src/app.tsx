import { Home } from "./pages/Home";
import { Header } from "./components";

import { AuthContextProvider } from "./store/contexts/AuthContext";
import { TaskContextProvider } from "./store/contexts/TaskContext";

export function App() {
  return (
    <AuthContextProvider>
      <Header />

      <TaskContextProvider>
        <Home />
      </TaskContextProvider>
    </AuthContextProvider>
  )
}