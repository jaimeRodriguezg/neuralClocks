"use client";
import { FC } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo: FC = () => {
  return (
    <Image
      alt="Logo"
      className="md:block cursor-pointer"
      height={100}
      width={200}
      src="/logos/logo-1.png"
      priority
      style={{
        filter: "brightness(70%)",
      }}
    />
  );
};

export default Logo;
