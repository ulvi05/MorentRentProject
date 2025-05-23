import HeroFirstImage from "@/assets/images/hero-card-1.png";
import HeroSecondImage from "@/assets/images/hero-card-2.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="grid text-white lg:grid-cols-2 gap-y-4 lg:gap-x-8">
      <div className="relative bg-information h-[280px] lg:h-[320px] xl:h-[360px] w-full rounded-[10px]">
        <img
          src={HeroFirstImage}
          alt="Hero 1"
          className="object-cover object-bottom w-full h-full"
        />
        <div className="absolute left-6 top-6 max-w-[284px]">
          <h1 className="text-[28px] leading-[150%] lg:text-[32px] tracking-[-0.96px] font-semibold mb-5">
            The Best Platform for Car Rental
          </h1>
          <h3 className="mb-4 text-sm lg:text-base leading-[150%] tracking-[-0.32px]">
            Ease of doing a car rental safely and reliably. Of course at a low
            price.
          </h3>
          <Link to={"/list"}>
            <Button>Rental Car</Button>
          </Link>
        </div>
      </div>
      <div className="relative bg-primary h-[280px] lg:h-[320px] xl:h-[360px] w-full rounded-[10px]">
        <img
          src={HeroSecondImage}
          alt="Hero 2"
          className="object-cover object-bottom w-full h-full"
        />
        <div className="absolute left-6 top-6 max-w-[284px]">
          <h1 className="text-[28px] leading-[150%] lg:text-[32px] tracking-[-0.96px] font-semibold mb-5">
            Easy way to rent a car at a low price
          </h1>
          <h3 className="mb-4 text-sm lg:text-base leading-[150%] tracking-[-0.32px]">
            Providing cheap car rental services and safe and comfortable
            facilities.
          </h3>
          <Link to={"/list"}>
            <Button>Rental Car</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
