import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/index";
import { DialogProvider } from "./dialogs";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <DialogProvider />
    </div>
  );
};

export default RootLayout;
