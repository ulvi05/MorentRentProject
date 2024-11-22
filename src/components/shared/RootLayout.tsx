import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/index";
import { LoginDialog } from "./Login";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <LoginDialog />
    </div>
  );
};

export default RootLayout;
