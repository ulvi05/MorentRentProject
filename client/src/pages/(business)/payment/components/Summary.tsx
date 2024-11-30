import SummaryImg from "@/assets/images/summary.png";
import { RatingStar } from "../../detail/components/RatingStar";

export const PaymentSummary = () => {
  return (
    <div className="rounded-[10px] bg-white p-4 lg:p-6 h-fit lg:sticky top-[160px]">
      <h3 className="text-lg lg:text-xl font-bold leading-[150%] tracking-[-0.6px] text-secondary-500">
        Rental Summary
      </h3>
      <p className="text-secondary-300 text-sm font-medium leading-[150%] tracking-[-0.28px] mt-1 lg:mb-8 mb-6">
        Prices may change depending on the length of the rental and the price of
        your rental car.
      </p>
      <div className="flex items-center mb-6 gap-x-4 lg:mb-8">
        <img
          src={SummaryImg}
          alt="summary"
          className="w-[132px] h-[108px] object-contain"
        />
        <div>
          <h2 className="text-2xl lg:text-[32px] font-bold text-secondary-500 leading-[150%] tracking-[-0.96px]">
            Nissan GT - R
          </h2>
          <div className="flex items-center mt-2 gap-x-2">
            <RatingStar rating={4} />
            <p className="text-secondary text-sm font-medium tracing-[-0.28px] text-nowrap xl:text-wrap">
              440+ Reviewer
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#c3d4e966] lg:my-8 my-6" />
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-bold text-secondary-500 lg:text-xl leading-[150%] tracking-[-0.6px]">
            Total Rental Price
          </h4>
          <p className="text-sm font-medium leading-[150%] tracking-[-0.28px] text-secondary-300">
            Overall price and includes rental discount
          </p>
        </div>
        <p className="text-secondary-500 text-2xl lg:text-[32px] !leading-normal font-bold">
          $80.00
        </p>
      </div>
    </div>
  );
};
