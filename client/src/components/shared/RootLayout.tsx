import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/index";

import { getCurrentUserAsync } from "@/store/features/userSlice";
import { useAppDispatch } from "@/hooks/redux";
import { DialogProvider } from "./dialogs";

const RootLayout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCurrentUserAsync());
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <DialogProvider />
    </div>
  );
};

export default RootLayout;
