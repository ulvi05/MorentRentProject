import { RentCard } from "@/components/shared/rent-card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const PopularRentsSection = () => {
  return (
    <div>
      <div className="flex items-center justify-between py-2.5">
        <h3 className="pl-3 font-semibold lg:pl-5 text-secondary-300">
          Popular Car
        </h3>
        <Button variant={"link"} asChild>
          <Link to="/">View All</Link>
        </Button>
      </div>
      <div className="grid gap-4 xl:grid-cols-4 md:gap-6 lg:gap-8">
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
  );
};
