"use client";
import useTimerPomodoro from "@/app/hooks/useTimerPomodoro";
import Timer from "./components/timer/Timer";

export default function Home() {
  const { pomodoro } = useTimerPomodoro();
  return <Timer expiryMinutes={pomodoro} />;
}
