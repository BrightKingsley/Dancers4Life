import { ItemCard } from "@/app/components/client";
import { CustomSelect } from "@/app/components/client/Input";
import Sort from "../_components/Sort/Sort";
import New from "../_components/New";

const cards = [1, 1, 1, 1, 1, 1, 11, 1, 1, , 1, 1, 1];

export default function Events() {
  return (
    <div className="w-[95%] mx-auto h-full overflow-auto">
      <div className="flex w-full items-center justify-between mt-12">
        <h1 className="text-3xl md:text-5xl font-bold">Events</h1>
        <Sort />
      </div>
      <div className="grid mx-auto w-full gap-3 h-full grid-cols-1_ sm:grid-cols-2 md:grid-cols-4 mt-6">
        {cards.map((card, i) => (
          <ItemCard key={i} href={`events/${i}`} />
        ))}
      </div>
      <New type="event" />
    </div>
  );
}
