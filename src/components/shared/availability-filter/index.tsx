import { Button } from "@/components/ui/button";
import SwapIcon from "@/assets/icons/swap-icn.svg";
import { ReactNode } from "react";
import { CustomSelect } from "../Select";

export const AvailabilityFilter = () => {
  return (
    <div className="grid lg:grid-cols-[1fr_60px_1fr] gap-x-5 lg:gap-x-7 xl:gap-x-[44px] items-center">
      <Card
        heading={
          <div className="flex items-center gap-x-2">
            <span className="inline-block w-4 h-4 border-4 rounded-full border-[#3563e94d]">
              <span className="block w-2 h-2 rounded-full bg-primary" />
            </span>
            <p className="text-base font-semibold text-secondary-500 leading-[20px] tracking-[-0.32px]">
              Pick - Up
            </p>
          </div>
        }
      />
      <Button className="w-fit h-fit p-[18px] mx-auto -my-4 lg:my-0 z-10">
        <img src={SwapIcon} alt="swap" className="w-6 h-6" />
      </Button>
      <Card
        heading={
          <div className="flex items-center gap-x-2">
            <span className="inline-block w-4 h-4 border-4 rounded-full border-[#3563e94d]">
              <span className="block w-2 h-2 rounded-full bg-information" />
            </span>
            <p className="text-base font-semibold text-secondary-500 leading-[20px] tracking-[-0.32px]">
              Drop - Off
            </p>
          </div>
        }
      />
    </div>
  );
};

const Card = ({ heading }: { heading: ReactNode }) => {
  return (
    <div className="bg-white rounded-[10px] h-[136px] w-full pt-4 lg:pt-6 pb-5 lg:pb-7 px-6 xl:px-12">
      {heading}
      <div className="mt-3 lg:mt-4 grid grid-cols-[1fr_1px_1fr_1px_1fr] gap-x-2 md:gap-x-3 xl:gap-x-6">
        <CustomSelect
          label="Locations"
          options={[
            { label: "Baku", value: "baku" },
            { label: "London", value: "london" },
            { label: "İstanbul", value: "istanbul" },
            { label: "Berlin", value: "berlin" },
          ]}
          placeholder="Select your city"
        />
        <div className="w-full h-full bg-[#c3d4e966]" />
        <CustomSelect
          label="Date"
          options={[
            { label: "Baku", value: "baku" },
            { label: "London", value: "london" },
            { label: "İstanbul", value: "istanbul" },
            { label: "Berlin", value: "berlin" },
          ]}
          placeholder="Select your date"
        />
        <div className="w-full h-full bg-[#c3d4e966]" />
        <CustomSelect
          label="Time"
          options={[
            { label: "Baku", value: "baku" },
            { label: "London", value: "london" },
            { label: "İstanbul", value: "istanbul" },
            { label: "Berlin", value: "berlin" },
          ]}
          placeholder="Select your time"
        />
      </div>
    </div>
  );
};
