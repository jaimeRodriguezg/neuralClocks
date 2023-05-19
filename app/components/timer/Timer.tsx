"use client";
import { FC, useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import Button from "../ui/button/Button";

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { convertMinutesToExpiryDate } from "../../utils/";
import useTimerPomodoro from "@/app/hooks/useTimerPomodoro";
import { useRouter } from "next/navigation";
interface TimerProps {
  expiryMinutes: number;
}

const Timer: FC<TimerProps> = ({ expiryMinutes }) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 0);
  const router = useRouter();
  const { nextStep, count } = useTimerPomodoro();
  const [routeTo, setRouteTo] = useState<string | null | undefined>(null);

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: time,
    autoStart: false,
    onExpire: () => {
      setRouteTo(nextStep());
    },
  });

  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValue((prevValue) => prevValue + 60); // Incrementar en 60 segundos (1 minuto)
    }, 60000); // Actualizar cada minuto (60000 milisegundos)

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progressValue >= expiryMinutes * 60) {
      // Si hemos alcanzado el límite de segundos, detenemos el timer
      pause();
    }
  }, [progressValue, expiryMinutes, pause]);

  const percentage = Math.min(
    (progressValue / (expiryMinutes * 60)) * 100,
    100
  ); // Calcular el porcentaje completad

  useEffect(() => {
    const expiryDate = convertMinutesToExpiryDate(expiryMinutes);
    restart(expiryDate);
  }, [expiryMinutes, restart]);

  useEffect(() => {
    if (routeTo) {
      router.push(routeTo);
    }
  }, [routeTo, router]);

  return (
    <div className="flex flex-col justify-items-center items-center w-full h-full">
      <div className="w-3/5 md:w-4/12">
        <CircularProgressbarWithChildren
          value={percentage}
          className="h-auto opacity-90"
          strokeWidth={5}
          styles={buildStyles({
            textColor: "red",
            pathColor: "#FFDAF9",
            trailColor: "white",
          })}
        >
          <div className="flex justify-center text-9xl  text-white	">
            <span>{minutes}</span>:<span>{seconds}</span>
          </div>
        </CircularProgressbarWithChildren>
      </div>
      <div className="flex justify-center">
        <p className="text-white text-2xl">{isRunning ? "Focus" : "Rest"}</p>
      </div>
      <p className="text-white text-2xl">Intervalo : {count}</p>
      <div className="w-full">
        <div className="flex justify-center"></div>;
      </div>
      <div className="flex w-full justify-center align-middle mt-10">
        <div className="flex flex-wrap md:flex-nowrap w-[500px] gap-10">
          <Button outline small label="Start" onClick={start} />
          <Button small outline label="Pause" onClick={pause} />
          <Button small outline label="Resume" onClick={resume} />
          <Button
            small
            outline
            label="Restart"
            onClick={() => {
              const time = new Date();
              time.setSeconds(time.getSeconds() + 300);
              restart(time);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Timer;
