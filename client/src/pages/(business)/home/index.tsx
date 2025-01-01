import { AvailabilityFilter } from "@/components/shared/availability-filter";
import Hero from "./components/Hero";
import { RentList } from "@/components/shared/RentList";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import rentService from "@/services/rent";
import DynamicHelmet from "@/components/shared/DynamicHelmet";
import { ScrollToTop } from "@/components/shared/ScrollToTop";

const HomePage = () => {
  const { data: recommendedData, isLoading: recommendedLoading } = useQuery({
    queryKey: [QUERY_KEYS.RECOMMENDATION_RENTS],
    queryFn: () => rentService.getAll({ type: "recommended" }),
  });

  const recommendedRents = recommendedData?.data.items;

  return (
    <>
      <DynamicHelmet pageTitle="Home Page" />
      <div className="container flex flex-col pt-4 pb-8 lg:pt-8 lg:pb-16 gap-y-6 lg:gap-y-8">
        <Hero />
        <AvailabilityFilter />
        <RentList heading="Popular Car" />
        <RentList
          heading="Recomendation Car"
          isLoading={recommendedLoading}
          rents={recommendedRents}
        />
      </div>
      <ScrollToTop />
    </>
  );
};

export default HomePage;
