import { createBrowserRouter } from "react-router-dom";
import { paths } from "@/constants/paths";
import RootLayout from "@/components/shared/RootLayout";

import HomePage from "@/pages/(business)/home";
import RentListPage from "@/pages/(business)/lists";
import { DetailPage } from "@/pages/(business)/detail";
import PaymentPage from "@/pages/(business)/payment";

import DashboadMainPage from "@/pages/(dashboard)/main";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { ResetPassword } from "@/pages/(business)/reset-password";

import DashboardRentListPage from "@/pages/(dashboard)/rent/list";
import DashboardRentCreatePage from "@/pages/(dashboard)/rent/create";
import DashboardRentEditPage from "@/pages/(dashboard)/rent/edit";
import AuthLayout from "@/components/shared/AuthLayout";
import ReservationsPage from "@/pages/(business)/reservations";
import DashboardReservationListPage from "@/pages/(dashboard)/reservation/list";
import DashboardReviewListPage from "@/pages/(dashboard)/reviews/list";

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
        path: paths.detail(),
        element: <DetailPage />,
      },
      {
        path: "",
        element: <AuthLayout />,
        children: [
          {
            path: paths.payment(),
            element: <PaymentPage />,
          },
          {
            path: paths.RESERVATIONS,
            element: <ReservationsPage />,
          },
        ],
      },
      {
        path: paths.reset_password(),
        element: <ResetPassword />,
      },
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          {
            path: paths.DASHBOARD.MAIN,
            element: <DashboadMainPage />,
          },
          {
            path: paths.DASHBOARD.RENTS.LIST,
            element: <DashboardRentListPage />,
          },
          {
            path: paths.DASHBOARD.RENTS.CREATE,
            element: <DashboardRentCreatePage />,
          },
          {
            path: paths.DASHBOARD.RENTS.EDIT(":id"),
            element: <DashboardRentEditPage />,
          },
          {
            path: paths.DASHBOARD.RESERVATIONS.LIST,
            element: <DashboardReservationListPage />,
          },
          {
            path: paths.DASHBOARD.REVIEWS.LIST,
            element: <DashboardReviewListPage />,
          },
        ],
      },
    ],
  },
]);
