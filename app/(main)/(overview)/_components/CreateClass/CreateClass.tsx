"use client";
import {
  CustomSelect,
  CustomTextArea,
  Input,
} from "@/app/components/client/Input";
import { AnimateInOut, Button } from "@/app/components/client";
import {
  AddImage,
  CloseRed,
  Hashtag,
  Search,
  Smiley,
  Tag,
} from "@/utils/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import Loader from "@/app/components/Loader/Loader";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import AddLineIcon from "remixicon-react/AddLineIcon";
import DeleteBin2LineIcon from "remixicon-react/DeleteBin2LineIcon";

import { DanceClassModelType } from "@/models";
import { UploadButton, UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { formatToNumberWithDecimal } from "@/utils/functions/helpers/string-mutations";
import { BASE_URL } from "@/utils/constants/routes";
import { NotificationContext } from "@/context";

export default function Create({ closeForm }: { closeForm: Function }) {
  const { triggerNotification } = useContext(NotificationContext);
  const [classData, setClassData] = useState<DanceClassModelType>({
    type: "",
    description: "",
    photos: [],
    price: 0,
    members: [],
    dates: [{ start: new Date(), end: new Date() }],
  });

  const handleDateChange = (index: number, field: string, value: string) => {
    const newDatesArray = classData.dates.map((date, i) =>
      i === index ? { ...date, [field]: value } : date
    );

    setClassData((prev) => ({ ...prev, dates: newDatesArray }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/api/classes`, {
        method: "POST",
        body: JSON.stringify(classData),
      });

      if (res.ok)
        return triggerNotification(
          `${classData.type} class created successfully`
        );

      triggerNotification(` failed to create ${classData.type} class `);
    } catch (error) {
      triggerNotification(` failed to create ${classData.type} class `);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-full overflow-auto">
      <div className="relative w-full h-full space-y-6 overflow-auto !py-5 px-8 md:pb-0">
        <div className="flex w-full">
          <p className="font-semibold">Create Class</p>

          <button
            onClick={() => closeForm()}
            className="flex items-center justify-center p-2 ml-auto"
          >
            <CloseLineIcon className="w-6 h-6 fill-red-500" />
          </button>
        </div>
        <div className="">
          <Input
            type="number"
            onChange={(e) =>
              setClassData((prev) => ({
                ...prev,
                price: parseFloat(formatToNumberWithDecimal(e.target.value)),
              }))
            }
            placeholder="Price"
            className=""
          />
        </div>
        <div className="">
          <label htmlFor="" className="font-semibold text-black-faded">
            type
          </label>
          <CustomSelect
            placeholder="Type"
            name="type"
            handleChange={(value: any) => {
              setClassData((prev) => ({
                ...prev,
                type: value.value,
              }));
            }}
            options={[
              {
                label: "ballet",
                value: "ballet",
              },
              {
                label: "hip-hop",
                value: "hip-hop",
              },
              {
                label: "salsa",
                value: "salsa",
              },
              {
                label: "line dance",
                value: "line dance",
              },
            ]}
          />
        </div>
        <div className="">
          <CustomTextArea
            value={classData.description}
            onChange={(e) =>
              setClassData((prev) => ({ ...prev, description: e.target.value }))
            }
            name="description"
            placeholder="description"
          />
        </div>
        <div className="flex rounded-xl">
          <div
            title="Add Photos"
            className="space-y-3 w-full mx-auto text-center"
          >
            {/* <div className="w-12 h-12 rounded-full bg-white p-2 mx-auto">
                <Image alt="add image" src={AddImage} />
              </div>
              <p className="mx-auto">Add Photos</p>
              <small className="mx-auto text-black-faded">
                or drag and drop files here
              </small> */}
            <UploadDropzone<OurFileRouter, any>
              endpoint="userPhoto"
              onClientUploadComplete={(res) => {
                const fileUrls = res.map((data) => data.url);
                setClassData((prev) => ({ ...prev, photos: fileUrls }));
              }}
              onUploadError={() => {}}
              onUploadBegin={() => {}}
              className="w-full bg-brand-orange/10 cursor-pointer"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex w-full justify-between">
            <label htmlFor="">Dates</label>
            <button
              onClick={() =>
                setClassData((prev) => ({
                  ...prev,
                  dates: [
                    ...prev.dates,
                    {
                      start: new Date(),
                      end: new Date(),
                    },
                  ],
                }))
              }
              className="flex items-center justify-center p-2"
            >
              <AddLineIcon className="text-brand-orange w-6 h-6" />
            </button>
          </div>
          {classData.dates?.map((date, i) => (
            <AnimateInOut
              show={classData.dates[i] !== undefined}
              init={{ opacity: 0, translateY: 50 }}
              animate={{ opacity: 1, translateY: 0 }}
              out={{ opacity: 0, translateY: 50 }}
              key={i}
              className="flex gap-2"
            >
              <div className="flex-1">
                <Input
                  name="start"
                  onChange={(e) => handleDateChange(i, "start", e.target.value)}
                  type="date"
                  placeholder="Start date"
                />
              </div>
              <div className="flex-1">
                <Input
                  name="end"
                  onChange={(e) => handleDateChange(i, "end", e.target.value)}
                  type="date"
                  placeholder="End date"
                />
              </div>
              <button
                onClick={() => {
                  if (!(classData.dates.length > 1)) return;
                  const newDatesArray = [
                    ...classData.dates.slice(0, i),
                    ...classData.dates.slice(i + 1),
                  ];
                  setClassData((prev) => ({ ...prev, dates: newDatesArray }));
                }}
                className="flex items-center justify-center p-2"
              >
                <DeleteBin2LineIcon className="text-brand-orange w-6 h-6" />
              </button>
            </AnimateInOut>
          ))}
        </div>
        <div className="pb-10">
          <Button>Create</Button>
        </div>
      </div>
      {/* {showTags && <TagPeople setShowTags={setShowTags} />} */}
    </form>
  );
}

const people = [1, 1, 1, 1, 1, 1, 11];

// function TagPeople({
//   setShowTags,
// }: {
//   setShowTags: React.Dispatch<React.SetStateAction<boolean>>;
// }) {
//   const Person = ({}) => (
//     <div className="flex items-center shadow-md shadow-gray-500/10 border-[1px] border-black-faded/5 rounded-xl py-2 px-1">
//       <Avatar
//         alt="user"
//         src={"/images/users/1.png"}
//         className="w-14 h-14 bg-[#F9C3E0]"
//       />

//       <div className="ml-2">
//         <p className="font-bold">Endurance Alex</p>
//         <small className="text-black-faded">@alexander_jnr</small>
//       </div>
//       <div className="flex ml-auto w-fit items-center gap-2">
//         <input type="checkbox" />
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <Overlay onClick={() => setShowTags(false)} />
//       <div className="absolute z-30 inset-0 m-auto">
//         <div className="animate-fade-in w-full h-full flex flex-col  mx-auto bg-white  rounded-t-xl  overflow-auto py-5 px-4 space-y-6">
//           <div className="flex w-full">
//             <p className="font-semibold">Tag People</p>
//             <button
//               onClick={() => setShowTags(false)}
//               className="ml-auto bg-brand-orange/10 p-2 w-8 h-8 flex items-center justify-center rounded-full"
//             >
//               <Image src={CloseRed} alt="close" />
//             </button>
//           </div>
//           <div className="">
//             <Input
//               type="text"
//               placeholder="Search for people"
//               trailing={[
//                 <Image key={Math.random()} src={Search} alt="search" />,
//               ]}
//             />
//           </div>
//           <div className="overflow-y-auto space-y-2">
//             {people.map((person, i) => (
//               <Person key={i} />
//             ))}
//           </div>
//           <div className="pb-10">
//             <Button className="">Tag users</Button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
