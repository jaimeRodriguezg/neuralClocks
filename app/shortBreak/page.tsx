import React from "react";
import Timer from "../components/timer/Timer";

const shortBreak = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);
  return <Timer expiryTime={time} />;
};

export default shortBreak;
