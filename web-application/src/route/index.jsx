import { createBrowserRouter } from "react-router-dom";

import { RouterProvider } from "react-router-dom";
import HomePage from "../pages/commercial/HomePage";
import LoginPage from "../pages/commercial/LoginPage";
import AdminPage from "../pages/admin/AdminPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  { path: "/login", element: <LoginPage /> },
  {
    path: "/admin",
    element: <AdminPage />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
