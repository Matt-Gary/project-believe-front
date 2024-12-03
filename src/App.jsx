import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router.";
import { Toaster } from "sonner";
import { AuthContextProvider } from "./contexts/AuthContext";

export function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Toaster richColors position="top-center" closeButton />
        <Router />
      </BrowserRouter>
    </AuthContextProvider>
  );
}
