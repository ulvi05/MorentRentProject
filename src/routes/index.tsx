import RootLayout from "@/components/shared/RootLayout";
import { paths } from "@/constants/paths";
import HomePage from "@/pages/home";
import RentListPage from "@/pages/lists";
import PaymentPage from "@/pages/payment";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: paths.home,
        element: <HomePage />,
      },
      {
        path: paths.list,
        element: <RentListPage />,
      },
      {
        path: paths.payment,
        element: <PaymentPage />,
      },
    ],
  },
]);
