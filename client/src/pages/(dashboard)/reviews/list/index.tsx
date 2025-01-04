import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { QUERY_KEYS } from "@/constants/query-keys";
import Loader from "@/components/shared/Loader";
import reviewService from "@/services/review";
import { DataTable } from "@/components/shared/DataTable";

const DashboardReviewListPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.ADMIN_REVIEWS],
    queryFn: () => reviewService.getAll(),
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
        <h2 className="text-2xl font-bold text-primary">Reviews</h2>
      </div>
      <DataTable columns={columns} data={items} />
    </div>
  );
};

export default DashboardReviewListPage;
