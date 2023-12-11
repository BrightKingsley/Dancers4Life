"use client";
import { Button } from "@/app/components/client";
import { Input } from "@/app/components/client/Input";
import { lettersAndNumbersOnly } from "@/utils/functions/helpers/string-mutations";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function RegistrationForm({
  name,
  handleSubmit,
  price,
}: {
  name: string;
  price: number;
  handleSubmit: Function;
}) {
  const { data } = useSession();
  const session = data;

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="w-full h-full space-y-2 overflow-auto"
    >
      <div className="w-fit mx-auto text-center leading-snug text-gray-600">
        <h2 className="text-3xl font-bold">Register for {name}?</h2>
        <div className="text-2xl font-bold">
          <span className="text-sm font-bold">N</span>
          <span className="text-brand-orange">{price}</span>
        </div>
      </div>
      <div className="px-2">
        <label>first name</label>
        <Input
          name="firstname"
          type="text"
          defaultValue={session?.user.name ?? userData.firstname}
          value={userData.firstname}
          placeholder="firstname"
          onChange={(e) =>
            setUserData((prev) => ({
              ...prev,
              firstname: lettersAndNumbersOnly(e.target.value),
            }))
          }
        />
      </div>
      <div className="px-2">
        <label>last name</label>
        <Input
          name="lastname"
          type="text"
          defaultValue={session?.user.name ?? userData.lastname}
          value={userData.lastname}
          placeholder="lastname"
          onChange={(e) =>
            setUserData((prev) => ({
              ...prev,
              lastname: lettersAndNumbersOnly(e.target.value),
            }))
          }
        />
      </div>
      <div className="p-2">
        <Button type="submit">Register</Button>
      </div>
    </form>
  );
}
