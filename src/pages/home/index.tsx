import { AvailabilityFilter } from "@/components/shared/availability-filter";
import Hero from "./components/Hero";

const HomePage = () => {
  return (
    <div className="container flex flex-col pt-4 pb-8 lg:pt-8 lg:pb-16 gap-y-6 lg:gap-y-8">
      <Hero />
      <AvailabilityFilter />
    </div>
  );
};

export default HomePage;
