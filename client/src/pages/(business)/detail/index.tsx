import { RentList } from "@/components/shared/RentList";
import { ImagesSection } from "./components/Images";
import { InformationSection } from "./components/Information";
import { ReviewsSection } from "./components/Reviews";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import rentService from "@/services/rent";
import Loader from "@/components/shared/Loader";
import { paths } from "@/constants/paths";
import { Button } from "@/components/ui/button";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import DynamicHelmet from "@/components/shared/DynamicHelmet";

export const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: recommendedData, isLoading: recommendedLoading } = useQuery({
    queryKey: [QUERY_KEYS.RECOMMENDATION_RENTS],
    queryFn: () => rentService.getAll({ type: "recommended" }),
  });

  const recommendedRents = recommendedData?.data.items;
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.RENT_DETAIL, id],
    queryFn: () => rentService.getById(id!),
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-600 bg-opacity-50">
        <Loader />
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
      <DynamicHelmet pageTitle="Detail Page" />
      <div className="container max-w-[1144px] py-6 lg:py-8">
        <div className="grid lg:grid-cols-[1fr_492px] xl:grid-cols-2 gap-x-8">
          <ImagesSection images={rent.images} />
          <InformationSection rent={rent} />
        </div>
        <ReviewsSection />
        <RentList maxCols={3} heading="Recent Cars" />
        <RentList
          maxCols={3}
          heading="Recomendation Cars"
          isLoading={recommendedLoading}
          rents={recommendedRents}
        />
        <ScrollToTop />
      </div>
    </>
  );
};
