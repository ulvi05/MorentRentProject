import HeartIcon from "@/assets/icons/heart.svg";
import NotificationIcon from "@/assets/icons/notification.svg";
import SettingsIcon from "@/assets/icons/settings.svg";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { ModalTypeEnum, useDialog } from "@/hooks/useDialog";
import { logoutAsync, selectUserData } from "@/store/features/userSlice";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRole } from "@/types";
import { paths } from "@/constants/paths";

const NavbarActions = () => {
  const { openDialog } = useDialog();
  const { user } = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutAsync());
  };
  return (
    <div className="flex gap-3 lg:gap-5">
      <Link
        to="/"
        className="rounded-full border border-[#c3d4e966] opacity-80 hover:opacity-100 duration-75 p-2.5"
      >
        <img src={HeartIcon} alt="heart" />
      </Link>
      <Link
        to="/"
        className="rounded-full border border-[#c3d4e966] opacity-80 hover:opacity-100 duration-75 p-2.5"
      >
        <img src={NotificationIcon} alt="notification" />
      </Link>
      <Link
        to="/"
        className="rounded-full border border-[#c3d4e966] opacity-80 hover:opacity-100 duration-75 p-2.5"
      >
        <img src={SettingsIcon} alt="settings" />
      </Link>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full border border-[#c3d4e966] opacity-80 hover:opacity-100 duration-75 p-2.5">
              <User2 color="#596780" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {user.role === UserRole.Admin && (
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to={paths.DASHBOARD.MAIN}>Dashboard</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/reservations">Reservations</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={() => openDialog(ModalTypeEnum.LOGIN)}>Sign In</Button>
      )}
    </div>
  );
};

export default NavbarActions;
