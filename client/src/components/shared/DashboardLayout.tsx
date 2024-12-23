import { Navigate, Outlet } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAppSelector } from "@/hooks/redux";
import { selectUserData } from "@/store/features/userSlice";
import Loader from "./Loader";
import { UserRole } from "@/types";
import { paths } from "@/constants/paths";

const DashboardLayout = () => {
  const { user, loading } = useAppSelector(selectUserData);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader />
      </div>
    );
  }
  if (!user || user.role !== UserRole.Admin) {
    return <Navigate to={paths.home} />;
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full px-6 overflow-auto">
        <SidebarTrigger className="my-4 ml-6" />
        <div className="p-6 rounded-[10px] bg-white w-full">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
