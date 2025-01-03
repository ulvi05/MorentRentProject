import { Link, useParams } from "react-router-dom";
import { Steps } from "./components/Steps";
import { PaymentSummary } from "./components/Summary";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import rentService from "@/services/rent";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { paths } from "@/constants/paths";
import DynamicHelmet from "@/components/shared/DynamicHelmet";
import { ScrollToTop } from "@/components/shared/ScrollToTop";

const PaymentPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.RENT_DETAIL, id],
    queryFn: () => rentService.getById(id!),
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-600 bg-opacity-50">
        <Loader className="w-12 h-12" />
        <p
          className="text-lg font-semibold text-white animate-pulse mt-7"
          aria-live="polite"
        >
          Loading...
        </p>
      </div>
    );
  }
  const rent = data?.data?.item;

  if (isError || !rent) {
    return (
      <div className="flex flex-col items-center justify-center mt-28">
        <p className="mb-3 text-2xl font-bold text-primary">
          Something went wrong!
        </p>
        <Button className="mt-4">
          <Link to={paths.home}>Go Back to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <DynamicHelmet pageTitle="Payment Page" />
      <div className="container py-6 lg:py-8 grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_492px] lg:gap-x-8 gap-y-8">
        <Steps />
        <PaymentSummary rent={rent} />
      </div>
      <ScrollToTop />
    </>
  );
};

export default PaymentPage;
