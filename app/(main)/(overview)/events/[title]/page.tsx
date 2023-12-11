import { getEventByName } from "@/lib/services";
import HeadingAction from "../../_components/HeadingAction";

export default async function EventDetails({
  params,
}: {
  params: { [key: string]: string };
}) {
  try {
    const event = await getEventByName(params.type);

    if (!event) return <div>{"Could'nt get class data"}</div>;

    console.log(event);

    return (
      <div className="w-[95%] mx-auto h-full space-y-5 overflow-auto">
        <HeadingAction text={event.name} />
        <div className="">
          <span>Duration:</span>
          <span>{event.date.toLocaleDateString()}</span>
        </div>
        <div className="">{event.participants?.length} students currently</div>
        <div>
          <div>{event.description}</div>
        </div>
      </div>
    );
  } catch (error) {
    console.error({ error });
    return <div>Error Class Details</div>;
  }
}
