import { Button } from "@/app/components/client";
import { getDanceClassByType } from "@/lib/services";
import HeadingAction from "../../_components/HeadingAction";
import { getDuration } from "@/utils/functions/helpers/string-mutations";
import DetailsCarousel from "../../_components/DetailsCarousel/DetailsCarousel";

import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default async function ClassDetails({
  params,
}: {
  params: { [key: string]: string };
}) {
  try {
    const danceClassDetails = await getDanceClassByType(params.type);

    if (!danceClassDetails) return <div>{"Could'nt get class data"}</div>;

    console.log(danceClassDetails);

    return (
      <div className="w-[95%] mx-auto h-full space-y-5 overflow-auto">
        <HeadingAction type="class" text={danceClassDetails.type} />
        <div className="space-y-2">
          <div className="">
            <span>Duration: </span>
            <span>
              {getDuration(
                danceClassDetails.dates[0].start,
                danceClassDetails.dates[0].end
              )}
            </span>
          </div>
          <div className="">
            {danceClassDetails.members.length} current registered students
          </div>
        </div>
        <div className="">
          <DetailsCarousel />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Description</h2>
          <p>{danceClassDetails.description}</p>
        </div>
      </div>
    );
  } catch (error) {
    console.error({ error });
    return <div>Error Class Details</div>;
  }
}
