import { useState } from "react";
import { RatingStar } from "./RatingStar";
import { Button } from "@/components/ui/button";

import HeardFilledSvg from "@/assets/icons/heart-filled.svg";
import HeardOutlinedSvg from "@/assets/icons/heart-outlined.svg";
import { Link } from "react-router-dom";
import { Rent } from "@/types";

type Props = {
  rent: Rent;
};

export const InformationSection = ({ rent }: Props) => {
  const [isLiked, setIsLiked] = useState(false);
  const {
    name,
    description,
    fuel,
    gearBox,
    capacity,
    category,
    price,
    discount,
  } = rent;

  const specifications = [
    { label: "Type Car", value: category.name },
    { label: "Capacity", value: `${capacity} Person` },
    { label: "Steering", value: gearBox },
    { label: "Gasoline", value: `${fuel}L` },
  ];

  const originalPrice = Math.floor(price / (1 - discount / 100));

  return (
    <div className="bg-white rounded-[10px] p-4 lg:p-6 relative">
      <h1 className="text-2xl lg:text-[32px] !leading-[150%] tracking-[-0.96px] font-bold text-secondary-500">
        {name}
      </h1>
      <div className="flex items-center mt-2 gap-x-2">
        <RatingStar rating={4} />
        <p className="text-secondary text-sm font-medium tracing-[-0.28px]">
          440+ Reviewer
        </p>
      </div>
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="absolute h-fit right-6 top-6"
      >
        <img src={isLiked ? HeardFilledSvg : HeardOutlinedSvg} alt="heart" />
      </button>
      <p className="min-h-[120px] my-5 text-lg lg:my-8 lg:text-xl text-secondary !leading-[200%] tracking-[-0.4px]">
        {description}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-4">
        {specifications.map((specification, index) => (
          <div key={index} className=" w-[200px] flex justify-between">
            <p className="text-lg font-normal text-secondary-300 lg:text-xl leading-[150%] tracking-[-0.4px]">
              {specification.label}
            </p>
            <p className="text-lg font-semibold text-secondary lg:text-xl leading-[150%] tracking-[-0.4px]">
              {specification.value}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-12 lg:mt-16">
        <div>
          <p className="text-[28px] font-bold text-secondary-500">
            ${price}/ <span className="text-base text-secondary-300">days</span>
          </p>

          <p className="-mt-2 text-base font-bold line-through text-secondary-300">
            ${originalPrice}
          </p>
        </div>
        <Link replace to={"/payment"}>
          <Button>Rent Now</Button>
        </Link>
      </div>
    </div>
  );
};
