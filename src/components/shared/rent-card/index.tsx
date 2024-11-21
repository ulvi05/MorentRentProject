import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "@/constants/paths";

import { Button } from "@/components/ui/button";
import HeardFilledSvg from "@/assets/icons/heart-filled.svg";
import HeardOutlinedSvg from "@/assets/icons/heart-outlined.svg";
import CarImg from "@/assets/images/koenigsegg.png";
import FuelImg from "@/assets/icons/fuel.svg";
import TransmissionImg from "@/assets/icons/transmission.svg";
import PeopleImg from "@/assets/icons/people.svg";

export const RentCard = () => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  const id = "962848f4-84c9-4318-95bc-b32da512631d";

  function navigateDetailPage() {
    navigate(paths.detail(id));
  }
  return (
    <div className="w-full bg-white rounded-[10px] p-4 lg:p-6">
      <div className="flex justify-between">
        <div>
          <h4
            onClick={navigateDetailPage}
            className="font-bold text-base text-secondary-500 lg:text-xl leading-[150%] tracking-[-0.6px] cursor-pointer hover:underline"
          >
            Koenigsegg
          </h4>
          <p className="text-secondary-300 text-xs lg:text-sm leading-[150%] tracking-[-0.28px]">
            Sport
          </p>
        </div>
        <button onClick={() => setIsLiked(!isLiked)} className="h-fit">
          <img src={isLiked ? HeardFilledSvg : HeardOutlinedSvg} alt="heart" />
        </button>
      </div>
      <div
        className="relative mt-8 cursor-pointer lg:mt-12"
        onClick={navigateDetailPage}
      >
        <img src={CarImg} alt="rolls-royce" className="w-full" />
        <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_0%,#FFF_100%)] w-full h-[68px] absolute bottom-0" />
      </div>
      <div className="flex items-center justify-between mt-5 lg:mt-9">
        <div className="flex gap-1.5 items-center">
          <img src={FuelImg} alt="Fuel" />
          <p className="text-sm font-medium text-secondary-300  leading-[24px] tracking-[-0.28px]">
            90L
          </p>
        </div>
        <div className="flex gap-1.5 items-center">
          <img src={TransmissionImg} alt="Transmission" />
          <p className="text-sm font-medium text-secondary-300  leading-[24px] tracking-[-0.28px]">
            Manual
          </p>
        </div>
        <div className="flex gap-1.5 items-center">
          <img src={PeopleImg} alt="People" />
          <p className="text-sm font-medium text-secondary-300  leading-[24px] tracking-[-0.28px]">
            2 People
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 lg:mt-6">
        <p className="text-xl font-bold text-secondary-500">
          $99.00/ <span className="text-sm text-secondary-300">day</span>
        </p>
        <Link replace to={"/payment"}>
          <Button>Rent Now</Button>
        </Link>
      </div>
    </div>
  );
};
