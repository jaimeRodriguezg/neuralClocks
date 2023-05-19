"use client";
import useTimerPomodoro from "@/app/hooks/useTimerPomodoro";
import Timer from "../components/timer/Timer";

const ShortBreak = () => {
  const { shortBreak } = useTimerPomodoro();
  return <Timer expiryMinutes={shortBreak} />;
};

export default ShortBreak;
