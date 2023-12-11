import Image from "next/image";
import React from "react";

export default function Avatar({
  className = "",
  icon,
  src,
  alt = "",
}: {
  icon?: React.ReactNode;
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className="relative w-fit h-fit">
      <div className={`relative rounded-full overflow-clip ${className}`}>
        <Image src={src} alt={alt} width={480} height={480} />
      </div>
      {icon && (
        <div className="absolute w-5 h-5 rounded-full overflow-clip bottom-0 right-0">
          {icon}
        </div>
      )}
    </div>
  );
}
