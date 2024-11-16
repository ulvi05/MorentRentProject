import { Button } from "@/components/ui/button";
import SwapIcon from "@/assets/icons/swap-icn.svg";
import { ReactNode } from "react";

export const AvailabilityFilter = () => {
  return (
    <div className="grid grid-cols-[1fr_60px_1fr] gap-x-5 lg:gap-x-[44px] items-center">
      <Button className="h-fit p-[18px]">
        <img src={SwapIcon} alt="swap" className="w-6 h-6" />
      </Button>
      <div className="bg-white rounded-[10px] h-[136px] w-full"></div>
    </div>
  );
};

const Card = ({ heading }: { heading: ReactNode }) => {
  return (
    <div className="bg-white rounded-[10px] h-[136px] w-full pt-4 lg:pt-6 pb-5 lg:pb-7">
      {heading}
    </div>
  );
};
