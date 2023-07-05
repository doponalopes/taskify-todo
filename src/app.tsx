import { Home } from "./pages/Home";
import { Header } from "./components";

import { AuthContextProvider } from "./store/contexts/AuthContext";

export function App() {
  return (
    <AuthContextProvider>
      <Header />
      <Home />
    </AuthContextProvider>
  )
}