import { AvailabilityFilter } from "@/components/shared/availability-filter";
import Hero from "./components/Hero";
import { RentList } from "../../components/shared/RentList";

const HomePage = () => {
  return (
    <div className="container flex flex-col pt-4 pb-8 lg:pt-8 lg:pb-16 gap-y-6 lg:gap-y-8">
      <Hero />
      <AvailabilityFilter />
      <RentList heading="Popular Car" />
      <RentList heading="Recomendation Car" />
    </div>
  );
};

export default HomePage;
