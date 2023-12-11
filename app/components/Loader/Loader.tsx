"use client";
import LoadingIndicator from "@/assets/gifs/malipoma-loading.gif";
import { LottieOptions, useLottie } from "lottie-react";
import loader from "@/animations/loader.json";

export default function Loader() {
  const animationOptions: LottieOptions = {
    animationData: loader,
    loop: true,
    reversed: true,
    color: "red",
  };

  const { View } = useLottie(animationOptions);
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-brand-silver/10 z-[1000] backdrop-blur-sm">
      <div className="space-y-4 rounded-xl p-4 bg-white_">
        <div className="w-40 h-40 mx-auto">
          {/* <Image src={LoadingIndicator} alt="loader" /> */}
          {View}
        </div>
        {/* <p className="text-black-faded">Loading...please wait!</p> */}
      </div>
    </div>
  );
}
