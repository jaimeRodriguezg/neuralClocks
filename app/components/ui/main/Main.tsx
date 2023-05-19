"use client";
import React, { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ErouteNames } from "@/app/types";
import { getImageByRoute } from "@/app/utils";

interface MainProps {
  children: React.ReactNode;
}

const Main: FC<MainProps> = ({ children }) => {
  const pathName = usePathname();
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setOpacity(1);
  }, []);

  return (
    <div
      className={`pt-20 ${opacity === 1 ? "fade-transition" : ""}`}
      style={{
        height: "100%",
        backgroundImage: `url( ${getImageByRoute(pathName as ErouteNames)} )`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(70%)",
        opacity: opacity,
      }}
    >
      {children}
    </div>
  );
};

export default Main;
