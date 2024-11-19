import Image1 from "@/assets/images/detail-1.png";
import Image2 from "@/assets/images/detail-2.png";
import Image3 from "@/assets/images/detail-3.png";
import Image4 from "@/assets/images/detail-4.png";

export const ImagesSection = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-[1fr_124px] gap-6">
      <img src={Image1} alt="Main" className="col-span-3" />
      <img src={Image2} alt="Other1" />
      <img src={Image3} alt="Other2" />
      <img src={Image4} alt="Other3" />
    </div>
  );
};
