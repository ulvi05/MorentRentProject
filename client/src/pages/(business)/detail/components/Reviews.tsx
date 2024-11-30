import { Review } from "./Review";

export const ReviewsSection = () => {
  return (
    <div className="my-6 lg:my-8 rounded-[10px] bg-white p-5 lg:p-6">
      <div className="flex items-center gap-x-3">
        <h3 className="font-semibold lg:text-xl texl-lg tracking-[-0.4px] text-secondary">
          Reviews
        </h3>
        <div className="py-1.5 px-3 bg-primary rounded text-white font-bold text-sm">
          13
        </div>
      </div>
      <div className="flex flex-col mt-6 lg:mt-8 gap-y-4 lg:gap-y-6">
        <Review />
        <Review />
        <Review />
        <Review />
      </div>
    </div>
  );
};
