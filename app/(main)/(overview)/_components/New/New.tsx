"use client";
import { Button, Overlay } from "@/app/components/client";
import AddLineIcon from "remixicon-react/AddLineIcon";
import { CreateClass } from "../CreateClass";
import { useState } from "react";
import { AnimateInOut } from "@/app/components/client";

export default function New({ type }: { type: "class" | "event" }) {
  const [showForm, setShowForm] = useState(false);

  function handleHideOverlay() {
    setShowForm(false);
  }

  return (
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
          className="animate-slide-up fixed w-[95%] md:w-[40rem] md:h-[70vh] md:rounded-b-xl  mx-auto border bg-white inset-0 top-24 md:top-0 md:m-auto bottom-0 rounded-t-xl !z-[10000000000] overflow-clip"
        >
          <CreateClass closeForm={handleHideOverlay} />
        </AnimateInOut>
        {!showForm && (
          <Button className="px-8" onClick={() => setShowForm(true)}>
            <AddLineIcon className="w-6 h-6 text-white fill-white" /> New
          </Button>
        )}
      </div>
    </>
  );
}
