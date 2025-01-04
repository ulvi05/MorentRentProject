import { User2 } from "lucide-react";
import { RatingStar } from "./RatingStar";
import { Review as TReview } from "@/types";
import { formatDate } from "@/lib/utils";

type Props = {
  review: TReview;
};

export const Review = ({ review }: Props) => {
  const { author, createdAt, rating, content } = review;

  const fullName = `${author.name} ${author.surname}`;
  return (
    <div className="flex gap-x-4 ">
      <div className="p-3 rounded-full bg-primary h-14 w-14">
        <User2 className="w-full h-full text-white" />
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between w-full">
          <div>
            <h6 className="text-lg font-bold lg:text-xl text-secondary-500 leading-[150%] tracking-[-0.6px]">
              {fullName}
            </h6>
          </div>
          <div className="-translate-y-3">
            <p className="text-secondary-300 text-sm font-medium leading-[150%] tracking-[-0.28px] text-end mb-2">
              {formatDate(createdAt, "DD MMM YYYY")}
            </p>
            <RatingStar rating={rating} />
          </div>
        </div>
        <p className="text-sm font-normal !leading-[200%] tracking-[-0.28px] mt-3 text-secondary-300">
          {content}
        </p>
      </div>
    </div>
  );
};
