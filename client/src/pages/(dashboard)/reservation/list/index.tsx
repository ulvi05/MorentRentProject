import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { QUERY_KEYS } from "@/constants/query-keys";
import Loader from "@/components/shared/Loader";
import reservationService from "@/services/reservation";

const DashboardReservationListPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.ADMIN_RESERVATIONS],
    queryFn: () => reservationService.getAll(),
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

  console.log(items);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">Reservations</h2>
      </div>
      <DataTable columns={columns} data={items} />
    </div>
  );
};

export default DashboardReservationListPage;
