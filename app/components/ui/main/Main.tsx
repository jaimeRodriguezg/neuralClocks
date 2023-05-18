import React, { FC } from "react";

interface MainProps {
  children: React.ReactNode;
}

const Main: FC<MainProps> = ({ children }) => {
  return (
    <div
      className="pt-20"
      style={{
        height: "100%",
        backgroundImage: `url('/background/default.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(70%)",
      }}
    >
      {children}
    </div>
  );
};

export default Main;
