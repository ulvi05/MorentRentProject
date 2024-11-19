import { ImagesSection } from "./components/Images";
import { InformationSection } from "./components/Information";

export const DetailPage = () => {
  return (
    <div className="container">
      <div className="grid lg:grid-cols-[1fr_600px]">
        <ImagesSection />
        <InformationSection />
      </div>
    </div>
  );
};
