import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { QUERY_KEYS } from "@/constants/query-keys";
import rentService from "@/services/rent";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { paths } from "@/constants/paths";
import { DataTable } from "@/components/shared/DataTable";

const DashboardRentListPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.ADMIN_RENTS],
    queryFn: () => rentService.getAll({ take: 50 }),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader className="w-12 h-12" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center text-xl text-red-600">
        Something went wrong, Please try again.
      </div>
    );
  }

  const items = data?.data?.items || [];
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">Rents</h2>
        <Button asChild>
          <Link to={paths.DASHBOARD.RENTS.CREATE}>Create Rent</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={items} />
    </div>
  );
};

export default DashboardRentListPage;
