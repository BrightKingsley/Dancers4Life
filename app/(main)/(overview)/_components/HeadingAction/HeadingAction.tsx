"use client";
import { Button, Overlay } from "@/app/components/client";
import AddLineIcon from "remixicon-react/AddLineIcon";
import { CreateClass } from "../CreateClass";
import { useState } from "react";
import { AnimateInOut } from "@/app/components/client";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import RegistrationForm from "../RegistrationForm/RegistrationForm";

export default function New({
  text,
  type,
}: {
  text: string | React.ReactNode;
  type: "class" | "event";
}) {
  const [showForm, setShowForm] = useState(false);

  const { ref, inView } = useInView({ threshold: 0, delay: 500 });

  function handleHideOverlay() {
    setShowForm(false);
  }

  const registerForClass = async () => {};

  const registerForEvent = async () => {};

  return (
    <div
      ref={ref}
      className="flex w-full items-center justify-between mt-12 px-2"
    >
      <h1 className="text-3xl md:text-5xl font-bold  capitalize">
        {text} Classes
      </h1>
      <div
        className={`flex items-center transition-all duration-200 ${
          !inView && "fixed right-4 md:right-16 bottom-20  bg-white"
        } gap-2 z-10 right-0 rounded-xl`}
      >
        {/* <p className="pl-2">Registered</p> */}
        <Button className={`md:px-8`} onClick={() => setShowForm(true)}>
          Register
        </Button>
      </div>
      <>
        <Overlay
          show={showForm}
          disableOnClick
          handleHideOverlay={handleHideOverlay}
        />
        <div className="fixed bottom-8 md:bottom-12 right-8 md:right-12 !z-50">
          <AnimateInOut
            init={{
              opacity: 0,
              translateY: "100%",
            }}
            animate={{
              opacity: 1,
              translateY: 0,
            }}
            out={{
              opacity: 0,
              translateY: "100%",
            }}
            show={showForm}
            className="animate-slide-up fixed w-[95%] md:w-[40rem] h-fit rounded-xl  m-auto border bg-white inset-0 top-24 md:top-0 md:m-auto bottom-0 rounded-t-xl !z-[10000000000] overflow-clip py-3 p-2"
          >
            <RegistrationForm
              name={`${text!.toString()} ${
                type === "class" ? "classes" : "event"
              }`}
              price={2000}
              handleSubmit={
                type === "class" ? registerForClass : registerForEvent
              }
            />
          </AnimateInOut>
        </div>
      </>
    </div>
  );
}
