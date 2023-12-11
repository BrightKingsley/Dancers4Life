import { ItemCard } from "@/app/components/client";
import { CustomSelect } from "@/app/components/client/Input";
import Sort from "../_components/Sort";
import { getDanceClasses } from "@/lib/services";
import New from "../_components/New";
import { DanceClassModelType } from "@/models";

const cards: any = {
  ballet: [
    "/images/dances/ballet/1.jpg",
    "/images/dances/ballet/2.jpg",
    "/images/dances/ballet/3.jpg",
    ,
    "/images/dances/ballet/4.jpg",
  ],
  salsa: [
    "/images/dances/salsa/1.jpg",
    "/images/dances/salsa/2.jpg",
    "/images/dances/salsa/3.jpg",
    ,
    "/images/dances/salsa/4.jpg",
  ],

  "hip-hop": [
    "/images/dances/salsa/1.jpg",
    "/images/dances/salsa/2.jpg",
    "/images/dances/salsa/3.jpg",
    ,
    "/images/dances/salsa/4.jpg",
  ],
};

export default async function Classes() {
  try {
    const danceClasses = await getDanceClasses({});
    console.log({ danceClasses });
    if (!danceClasses) return <div>could not get danceClasses</div>;

    if (danceClasses.length < 1)
      return (
        <div className="flex items-center justify-center h-full">
          <p>No dance classes available, please check again later</p>
          <New type="class" />
        </div>
      );
    return (
      <>
        <div className="w-[95%] mx-auto h-full overflow-auto">
          <div className="flex w-full items-center justify-between mt-12">
            <h1 className="text-3xl md:text-5xl font-bold">Classes</h1>
            <Sort />
          </div>
          <div className="grid mx-auto w-full flex-wrap gap-3 h-full grid-cols-1_ sm:grid-cols-2 md:grid-cols-4 mt-6">
            {danceClasses.map(({ description, type }, i) => (
              <ItemCard
                body={description}
                heading={type}
                key={i}
                // TODO: Remove this
                type="class"
                registered={i % 2 ? true : false}
                images={cards[type]}
                href={`classes/${type}`}
              />
            ))}
          </div>
        </div>
        <New type="class" />
      </>
    );
  } catch (error) {
    return <div>an error occured could not get classes</div>;
  }
}
