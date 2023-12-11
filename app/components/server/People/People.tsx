import Image from "next/image";
import { Avatar } from "../../client";
import { PlusIcon } from "@/utils/icons";

type PersonType = { type: "request" | "add"; icon: "" };

const people: PersonType[] = [
  { type: "request", icon: "" },
  { type: "request", icon: "" },
  { type: "add", icon: "" },
  { type: "request", icon: "" },
  { type: "add", icon: "" },
];

export default function People({
  title,
  type,
  className,
  color,
}: {
  title: string | React.ReactNode;
  type: "request" | "add";
  className?: string;
  color?: "yellow" | "blue" | "none";
}) {
  return (
    <div
      className={`rounded-const pb-20 p-2 ${
        color === "yellow"
          ? "bg-malipoma-yellow"
          : color === "blue"
          ? "bg-brand-orange"
          : "bg-transparent"
      } ${className} `}
    >
      <div className="text-white text-base flex font-semibold leading-normal">
        <p>{title}</p>
        <p className="underline text-sm font-medium ml-auto">See all</p>
      </div>
      <div className={`flex gap-3 overflow-auto ${className}`}>
        {people.map(({ type }, i) => (
          <Person key={i} type={type} icon="" />
        ))}
      </div>
    </div>
  );
}

function Person({ type }: PersonType) {
  return (
    <div className="bg-white rounded-xl p-2 flex items-center">
      <Avatar
        src={`/images/users/1.png`}
        alt="{user}"
        className="w-20 h-20 bg-[#7CF3DE]"
      />
      <div className="ml-2 space-y-1 font-semibold">
        <p>Jake Aelf</p>
        <small className="text-black-faded font-[500]">@chriswong</small>
        {type === "request" && (
          <div className="flex gap-2 items-center">
            <button className="text-white bg-brand-orange px-3 py-1 rounded-lg text-sm">
              Accept
            </button>
            <button className="text-malipoma-red px-3 py-1 rounded-lg text-sm outline outline-1 outline-malipoma-red">
              Decline
            </button>
          </div>
        )}
      </div>
      {type === "add" && (
        <div className="bg-brand-orange rounded-full shrink-0 text-white ml-auto h-8 w-8 flex items-center justify-center">
          <Image src={PlusIcon} alt="add" />
        </div>
      )}
    </div>
  );
}
