import { RentCard } from "@/components/shared/rent-card";
import { Filters } from "./components/Filters";
import { AvailabilityFilter } from "@/components/shared/availability-filter";

const RentListPage = () => {
  return (
    <div className="grid xl:grid-cols-[360px,1fr]">
      <Filters />
      <div className="bg-white" />
      <div className="flex flex-col px-6 pt-6 gap-y-6 lg:px-8 lg:pt-8 lg:gap-y-8">
        <AvailabilityFilter />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <RentCard />
          <RentCard />
          <RentCard />
          <RentCard />
          <RentCard />
          <RentCard />
          <RentCard />
          <RentCard />
          <RentCard />
          <RentCard />
          <RentCard />
          <RentCard />
          <RentCard />
          <RentCard />
          <RentCard />
          <RentCard />
        </div>
      </div>
    </div>
  );
};

export default RentListPage;
