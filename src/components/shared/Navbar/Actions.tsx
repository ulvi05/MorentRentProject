import HeartIcon from "@/assets/icons/heart.svg";
import NotificationIcon from "@/assets/icons/notification.svg";
import SettingsIcon from "@/assets/icons/settings.svg";
import { ModalTypeEnum, useDialog } from "@/hooks/useDialog";
import { LogInIcon } from "lucide-react";
import { Link } from "react-router-dom";

const NavbarActions = () => {
  const { openDialog } = useDialog();
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
      {/* <Link
        to="/"
        className="rounded-full border border-[#c3d4e966] opacity-80 hover:opacity-100 duration-75 p-2.5"
      >
        <User2 color="#596780" />
      </Link> */}
      <button
        onClick={() => openDialog({ type: ModalTypeEnum.LOGIN })}
        className="rounded-full border border-[#c3d4e966] opacity-80 hover:opacity-100 duration-75 p-2.5"
      >
        <LogInIcon color="#596780" />
      </button>
    </div>
  );
};

export default NavbarActions;
