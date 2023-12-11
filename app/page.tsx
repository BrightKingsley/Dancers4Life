"use client";
import { ChevronDownIcon, GlobeIcon } from "@/utils/icons";
import Link from "next/link";

import Image from "next/image";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "./components/client";

const images = [
  {
    image: "/images/dances/ballet/1.jpg",
    text: "Expression",
  },
  {
    image: "/images/dances/ballet/2.jpg",
    text: "Life",
  },
  {
    image: "/images/dances/ballet/3.jpg",
    text: "Freedom",
  },
];

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link href={href} className="text-white font-thin">
    {children}
  </Link>
);

export default function Home() {
  return (
    <>
      <main className="bg-brand-silver min-h-screen">
        <div className="w-full">
          <Swiper
            autoplay={{
              delay: 3000,
              pauseOnMouseEnter: false,
            }}
            speed={1000}
            loop
            effect="fade"
            navigation
            modules={[Autoplay, Pagination, EffectFade]}
            className="h-screen md:h-[30rem]"
          >
            {images.map(({ image, text }, i) => (
              <SwiperSlide
                className="relative"
                style={{ zIndex: "1 !important" }}
                key={i}
              >
                <Image
                  src={image}
                  alt=""
                  width={1080}
                  height={1080}
                  className="w-full h-full object-cover object-[6rem_ 8rem]"
                  priority
                />
                <div className="absolute top-16 left-12">
                  <h1 className="text-5xl font-bold text-white">
                    Welcome to the world of
                  </h1>
                  <p className="text-white font-bold text-3xl">{text}</p>
                </div>
              </SwiperSlide>
            ))}
            <div className="flex z-50 absolute w-full justify-center bottom-12 mx-auto items-center gap-3">
              <Link href={"/sign-in"}>
                <Button className="px-12 !w-fit whitespace-nowrap">
                  Get started
                </Button>
              </Link>
              <Link href={"/classes"}>
                <Button className="px-12 !w-fit whitespace-nowrap bg-white !text-gray-700">
                  View Classes
                </Button>
              </Link>
            </div>
          </Swiper>
        </div>
      </main>
    </>
  );
}
