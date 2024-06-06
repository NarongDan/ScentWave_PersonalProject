import AuthContextProvider from "./context/AuthContext";
import Router from "./route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <AuthContextProvider>
      <Router />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </AuthContextProvider>
  );
}
