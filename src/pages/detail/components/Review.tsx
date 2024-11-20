import { User2 } from "lucide-react";
import { RatingStar } from "./RatingStar";

export const Review = () => {
  return (
    <div className="flex gap-x-4 ">
      <div className="p-3 rounded-full bg-primary h-14 w-14">
        <User2 className="w-full h-full text-white" />
      </div>
      <div className="w-full">
        <div className="flex justify-between w-full">
          <div>
            <h6 className="text-lg font-bold lg:text-xl text-secondary-500 leading-[150%] tracking-[-0.6px]">
              Alex Stanton
            </h6>
            <p className="text-secondary-300 text-sm font-medium leading-[150%] tracking-[-0.28px]">
              CEO at Bukalapak
            </p>
          </div>
          <div>
            <p className="text-secondary-300 text-sm font-medium leading-[150%] tracking-[-0.28px] text-end mb-2">
              21 July 2022
            </p>
            <RatingStar rating={4} />
          </div>
        </div>
        <p className="text-sm font-normal !leading-[200%] tracking-[-0.28px] mt-3 text-secondary-300">
          We are very happy with the service from the MORENT App. Morent has a
          low price and also a large variety of cars with good and comfortable
          facilities. In addition, the service provided by the officers is also
          very friendly and very polite.
        </p>
      </div>
    </div>
  );
};
