import { Button } from "@/app/components/client";
import Link from "next/link";

export default function Account() {
  return (
    <div className="w-[95%] mx-auto h-full overflow-auto">
      <div className="flex w-full items-center justify-between mt-12">
        <h1 className="text-3xl md:text-5xl font-bold">Welcome, Chief</h1>
      </div>
      <div className="flex">
        <div className="space-y-2 flex flex-col items-center">
          <div className="w-24 h-24 border rounded-full overflow-clip bg-brand-silver">
            <img src="" alt="user" />
          </div>
          <button>Change</button>
        </div>
        <div className="">
          <div className="flex gap-2 items-center">
            <p>registered classes: 3</p>
            <Link href="/classes?sort=registered" className="text-brand-orange">
              view
            </Link>
          </div>
          <div className="flex gap-2 items-center">
            <p> registered events: 1</p>
            <Link href="/events?sort=registered" className="text-brand-orange">
              view
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 rigth-8">
        <Button>logout</Button>
      </div>
    </div>
  );
}
