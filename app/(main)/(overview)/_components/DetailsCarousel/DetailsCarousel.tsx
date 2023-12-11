"use client";
import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const images = [
  "/images/dances/ballet/1.jpg",
  "/images/dances/ballet/2.jpg",
  "/images/dances/ballet/3.jpg",
];

export default function DetailsCarousel() {
  return (
    <div className="w-full ">
      <Swiper
        autoplay={{
          delay: 1000,
          pauseOnMouseEnter: true,
        }}
        speed={1000}
        loop
        navigation
        modules={[Autoplay, Pagination]}
        className="h-96 md:h-[30rem]"
      >
        {images.map((image, i) => (
          <SwiperSlide style={{ zIndex: "1 !important" }} key={i}>
            <Image
              src={image}
              alt=""
              width={1080}
              height={1080}
              className="w-full h-full object-cover object-[6rem_ 8rem]"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
