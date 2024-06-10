import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import HomePage from "../pages/commercial/HomePage";
import LoginPage from "../pages/commercial/LoginPage";
import MainContainer from "../layout/AdminLayout.jsx/MainContainer";
import ProductManagement from "../features/admin/components/ProductManagement";
import OrderManagement from "../features/admin/components/OrderManagement";
import Registration from "../pages/commercial/Registration";
import HomePageBody from "../features/homepage/pages/HomePageBody";
import CartPage from "../features/homepage/pages/CartPage";
import CheckoutPage from "../features/homepage/pages/CheckoutPage";
import ProfilePage from "../pages/commercial/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      { path: "", element: <HomePageBody /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/billing", element: <CheckoutPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <Registration /> },
      { path: "/profile", element: <ProfilePage /> },
    ],
  },

  {
    path: "/admin",
    element: <MainContainer />,
    children: [
      { path: "", element: <ProductManagement /> },
      { path: "order-management", element: <OrderManagement /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
