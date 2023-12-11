"use client";
import Image from "next/image";
import Link from "next/link";
import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Button } from "..";
import { BASE_URL } from "@/utils/constants/routes";
import DeleteBin2LineIcon from "remixicon-react/DeleteBin2LineIcon";
import Media from "react-media";
import { ModalContext, NotificationContext } from "@/context";

const placeholderBody = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla reiciendis officia cupiditate corporis at quasi voluptate beatae maxime expedita ipsam laboriosam consectetur laudantium quibusdam soluta voluptates, modi sit asperiores ipsa repudiandae! Totam nemo magni, veniam, quis ducimus eaque facilis sed pariatur cum repellat commodi debitis sit voluptates aspernatur nihil enim!`;

let activeHover: any = false;

const memberReducer = (itemState: any, action: any) => {
  return action;
};

export default function ItemCard({
  body = placeholderBody,
  heading = "Ballet",
  images = [
    "/images/users/1.png",
    "/images/users/2.png",
    "/images/users/3.png",
  ],
  href = "/classes/i",
  registered = true,
  type,
}: {
  heading?: string | React.ReactNode;
  body?: string | React.ReactNode;
  href?: string;
  images?: string[];
  registered?: boolean;
  type?: "event" | "class";
}) {
  const { triggerModal } = useContext(ModalContext);
  const { triggerNotification } = useContext(NotificationContext);

  const [delay, setDelay] = useState(100000000);

  const [itemState, itemStateDispatch] = useReducer(memberReducer, activeHover);

  const swiperRef = useRef<any>();

  const handleMouseEnter = (e: React.MouseEvent) => {
    e.preventDefault();
    itemStateDispatch(true);

    setDelay(1000);
    swiperRef?.current?.swiper?.autoplay?.start();
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    e.preventDefault();

    itemStateDispatch(false);
    // setDelay(500);
    swiperRef?.current?.swiper?.autoplay?.stop();
  };

  const deleteClass = async () => {
    const res = await fetch(`${BASE_URL}/api/classes/${heading}`, {
      method: "DELETE",
    });

    console.log({ res });

    if (res.status === 204 || res.ok) {
      triggerNotification(`${heading} class deleted successfully`);
    }
  };

  const deleteEvent = async () => {
    const res = await fetch(`${BASE_URL}/api/events/${heading}`, {
      method: "DELETE",
    });

    if (res.status === 204) {
      triggerNotification(`${heading} event deleted successfully`);
    }
  };

  return (
    <Media queries={{ small: { maxWidth: 640 } }}>
      {(matches) => (
        <div
          onMouseEnter={(e) => !matches.small && handleMouseEnter(e)}
          onMouseLeave={(e) => !matches.small && handleMouseLeave(e)}
          className="w-full col-span-full h-[20rem] relative overflow-clip bg-white"
        >
          <div className="absolute z-10 top-8 left-6 flex items-center gap-2">
            {registered && (
              <div className=" rounded-lg p-2 outline outline-brand-orange text-brand-orange outline-1">
                registered
              </div>
            )}
            <button
              onClick={() =>
                triggerModal({
                  message: `Delete ${heading} ${
                    type === "class" ? "class" : "event"
                  }`,
                  cancel: triggerModal,
                  clickToDisable: true,
                  confirm:
                    type === "class"
                      ? () => deleteClass()
                      : () => deleteEvent(),
                })
              }
              className="p-2 rounded-lg outline outline-brand-red hover:backdrop-blur-md transition-all duration-150 hover:bg-brand-silver/20 text-brand-red outline-1"
              title={`Delete ${heading} ${
                type === "class" ? "class" : "event"
              }`}
            >
              <DeleteBin2LineIcon className="text-brand-red fill-brand-red w-6 h-6" />
            </button>
          </div>
          <Link
            href={href}
            className="rounded-xl overflow-clip shadow-lg w-full bg-white"
          >
            <div className="relative">
              <Swiper
                ref={matches.small ? null : swiperRef}
                autoplay={{
                  delay: matches.small ? 2000 : delay,
                  // disableOnInteraction: false,
                }}
                speed={1000}
                loop
                navigation
                modules={[Autoplay, Pagination]}
                className="w-80 h-80"
              >
                {images.map((image, i) => (
                  <SwiperSlide style={{ zIndex: "1 !important" }} key={i}>
                    <Image
                      src={image}
                      alt={heading + `-${i + 1}`}
                      width={1080}
                      height={1080}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="space-y-3 p-3">
              <h3 className="capitalize font-bold text-3xl">{heading}</h3>
              <p className="line-clamp-3">{body}</p>
            </div>
          </Link>
        </div>
      )}
    </Media>
  );
}
