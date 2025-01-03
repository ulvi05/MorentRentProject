import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux";
import { selectUserData } from "@/store/features/userSlice";
import Loader from "./Loader";
import { paths } from "@/constants/paths";

const AuthLayout = () => {
  const { user, loading } = useAppSelector(selectUserData);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-600 bg-opacity-50">
        <Loader className="w-12 h-12" />
      </div>
    );
  }
  if (!user) {
    return <Navigate to={paths.home} />;
  }

  return <Outlet />;
};

export default AuthLayout;
