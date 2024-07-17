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
import PersonalInformation from "../features/homepage/components/PersonalInformation";
import OrderHistory from "../features/homepage/components/OrderHistory";
import ProtectProfileRoute from "../features/authentication/components/ProtectProfileRoute";
import ProtectRoute from "../features/authentication/components/ProtectRoute";
import ProductPage from "../features/homepage/pages/ProductPage";
import SingleProductPage from "../features/homepage/pages/SingleProductPage";
import AboutUs from "../pages/commercial/AboutUs";
import ContactUs from "../pages/commercial/ContactUs";
import { Navigate } from "react-router-dom";
import ProtectRouteAdmin from "../features/authentication/components/ProtectRouteAdmin";
import AdminLiveChat from "../features/admin/components/AdminLiveChat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      { path: "*", element: <Navigate to="/" replace /> },
      { path: "", element: <HomePageBody /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/billing", element: <CheckoutPage /> },
      { path: "/products", element: <ProductPage /> },
      { path: "/product/:productName", element: <SingleProductPage /> },
      { path: "/about", element: <AboutUs /> },
      { path: "/contact", element: <ContactUs /> },
      {
        path: "/login",
        element: (
          <ProtectProfileRoute>
            <LoginPage />
          </ProtectProfileRoute>
        ),
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/profile",
        element: (
          <ProtectRoute>
            <ProfilePage />
          </ProtectRoute>
        ),
        children: [
          { path: "", element: <PersonalInformation /> },
          { path: "history", element: <OrderHistory /> },
        ],
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <ProtectRouteAdmin>
        <MainContainer />
      </ProtectRouteAdmin>
    ),
    children: [
      { path: "", element: <ProductManagement /> },
      { path: "order-management", element: <OrderManagement /> },
      { path: "live-chat", element: <AdminLiveChat /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
