import { ImagesSection } from "./components/Images";
import { InformationSection } from "./components/Information";

export const DetailPage = () => {
  return (
    <div className="container max-w-[1144px]">
      <div className="grid lg:grid-cols-[1fr_492px] xl:grid-cols-2 gap-x-8 py-6 lg:py-8">
        <ImagesSection />
        <InformationSection />
      </div>
    </div>
  );
};
