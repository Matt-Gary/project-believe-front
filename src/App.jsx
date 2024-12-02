import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router.";
import { Toaster } from "sonner";

export function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="top-center" closeButton />
      <Router />
    </BrowserRouter>
  );
}
