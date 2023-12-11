"use client";

import { CustomSelect } from "@/app/components/client/Input";
import { useRouter, usePathname } from "next/navigation";

export default function Sort() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <CustomSelect
      handleChange={(value: any) =>
        value && router.replace(`${pathname}?sort=${value.value}`)
      }
      className="w-36"
      name="filter"
      options={[
        {
          label: "registered",
          value: "registered",
        },
        {
          label: "all",
          value: "all",
        },
      ]}
      placeholder="sort"
    />
  );
}
