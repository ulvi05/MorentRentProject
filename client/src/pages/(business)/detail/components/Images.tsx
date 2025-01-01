import { useRef } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation, Zoom } from "swiper/modules";

type Props = {
  images: string[];
};

export const ImagesSection = ({ images }: Props) => {
  const sliderRef = useRef<SwiperRef>(null);

  function handleActiveSlide(index: number) {
    if (sliderRef.current) {
      sliderRef.current.swiper.slideTo(index);
    }
  }
  return (
    <div className="grid grid-rows-[1fr_124px] gap-y-2">
      <Swiper
        zoom
        ref={sliderRef}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className="w-full"
        modules={[Navigation, Zoom]}
      >
        {" "}
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-zoom-container cursor-zoom-in">
              <img
                src={image}
                alt="Car Picture"
                className="object-cover w-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        navigation
        spaceBetween={10}
        slidesPerView={3}
        pagination={{ clickable: true }}
        className="w-full col-span-3"
        modules={[Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            onClick={() => handleActiveSlide(index)}
            className="cursor-pointer"
          >
            <img
              src={image}
              alt="Car Picture"
              className="object-cover w-full h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
