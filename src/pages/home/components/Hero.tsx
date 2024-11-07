import HeroFirstImage from "@/assets/images/hero-card-1.png";
import HeroSecondImage from "@/assets/images/hero-card-2.png";
const Hero = () => {
  return (
    <div className="grid text-white lg:grid-cols-2 gap-y-4 lg:gap-x-8">
      <div className="bg-information-500 h-[280px] lg:h-[320px] xl:h-[360px] w-full rounded-[10px]">
        <img
          src={HeroFirstImage}
          alt="Hero 1"
          className="object-cover object-bottom w-full h-full"
        />
      </div>
      <div className="bg-primary-500 h-[280px] lg:h-[320px] xl:h-[360px] w-full rounded-[10px]">
        <img
          src={HeroSecondImage}
          alt="Hero 2"
          className="object-cover object-bottom w-full h-full"
        />
      </div>
    </div>
  );
};

export default Hero;
