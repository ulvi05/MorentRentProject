import { RentCard } from "@/components/shared/rent-card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Props = {
  heading: string;
};

export const List = ({ heading }: Props) => {
  return (
    <div>
      <div className="flex items-center justify-between py-2.5">
        <h3 className="pl-3 font-semibold lg:pl-5 text-secondary-300">
          {heading}
        </h3>
        <Button variant={"link"} asChild>
          <Link to="/list">View All</Link>
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 lg:gap-8">
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
