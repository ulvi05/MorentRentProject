import { useState } from "react";
import { Link } from "react-router-dom";
import { paths } from "@/constants/paths";

import { Button } from "@/components/ui/button";
import HeardFilledSvg from "@/assets/icons/heart-filled.svg";
import HeardOutlinedSvg from "@/assets/icons/heart-outlined.svg";
import FuelImg from "@/assets/icons/fuel.svg";
import TransmissionImg from "@/assets/icons/transmission.svg";
import PeopleImg from "@/assets/icons/people.svg";
import { Skeleton } from "@/components/ui/skeleton";
import { Rent } from "@/types";

type Props = {
  rent: Rent;
};

export const RentCard = ({ rent }: Props) => {
  const [isLiked, setIsLiked] = useState(false);

  const { _id, name, category, fuel, gearBox, images, capacity, price } = rent;
  const mainImage = images[0];

  return (
    <div className="w-full bg-white rounded-[10px] p-4 lg:p-6">
      <div className="flex justify-between">
        <div>
          <Link
            to={paths.detail(_id)}
            className="font-bold text-base text-secondary-500 lg:text-xl leading-[150%] tracking-[-0.6px] cursor-pointer hover:underline"
          >
            {name}
          </Link>
          <p className="text-secondary-300 text-xs lg:text-sm leading-[150%] tracking-[-0.28px]">
            {category.name}
          </p>
        </div>
        <button onClick={() => setIsLiked(!isLiked)} className="h-fit">
          <img src={isLiked ? HeardFilledSvg : HeardOutlinedSvg} alt="heart" />
        </button>
      </div>
      <Link
        to={paths.detail(_id)}
        className="relative mt-8 cursor-pointer lg:mt-12"
      >
        <img src={mainImage} alt="rolls-royce" className="w-full mt-2" />
        <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_0%,#FFF_100%)] w-full h-[68px] absolute bottom-0" />
      </Link>
      <div className="flex items-center justify-between mt-5 lg:mt-9">
        <div className="flex gap-1.5 items-center">
          <img src={FuelImg} alt="Fuel" />
          <p className="text-sm font-medium text-secondary-300  leading-[24px] tracking-[-0.28px]">
            {fuel}L
          </p>
        </div>
        <div className="flex gap-1.5 items-center">
          <img src={TransmissionImg} alt="Transmission" />
          <p className="text-sm font-medium text-secondary-300  leading-[24px] tracking-[-0.28px]">
            {gearBox}
          </p>
        </div>
        <div className="flex gap-1.5 items-center">
          <img src={PeopleImg} alt="People" />
          <p className="text-sm font-medium text-secondary-300  leading-[24px] tracking-[-0.28px]">
            {capacity} People
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 lg:mt-6">
        <p className="text-xl font-bold text-secondary-500">
          ${price}/ <span className="text-sm text-secondary-300">day</span>
        </p>
        <Link replace to={"/payment"}>
          <Button>Rent Now</Button>
        </Link>
      </div>
    </div>
  );
};

RentCard.Skeleton = function () {
  return (
    <div className="w-full bg-white rounded-[10px] p-4 lg:p-6">
      <div className="flex justify-between">
        <div>
          <Skeleton className="w-32 h-6 mb-2" />
          <Skeleton className="w-16 h-4" />
        </div>
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
      <div className="relative mt-8 lg:mt-12">
        <Skeleton className="object-contain w-full h-32" />
        <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_0%,#FFF_100%)] w-full h-[68px] absolute bottom-0"></div>
      </div>
      <div className="flex items-center justify-between mt-5 lg:mt-9">
        <div className="flex gap-1.5 items-center">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-8 h-4" />
        </div>
        <div className="flex gap-1.5 items-center">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-16 h-4" />
        </div>
        <div className="flex gap-1.5 items-center">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-12 h-4" />
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 lg:mt-6">
        <Skeleton className="w-20 h-6" />
        <Skeleton className="w-24 h-10 rounded-md" />
      </div>
    </div>
  );
};
