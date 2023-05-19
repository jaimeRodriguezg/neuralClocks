"use client";
import useTimerPomodoro from "@/app/hooks/useTimerPomodoro";
import Timer from "../components/timer/Timer";

const LongBreak = () => {
  const { longBreak } = useTimerPomodoro();
  return <Timer expiryMinutes={longBreak} />;
};

export default LongBreak;
