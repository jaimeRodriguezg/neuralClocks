"use client";
import { FC, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import Button from "../ui/button/Button";
import {
  VscDebugStart,
  VscDebugPause,
  VscDebugRestart,
  VscDebugContinue,
} from "react-icons/vsc";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface TimerProps {
  expiryTime: Date;
}

const Timer: FC<TimerProps> = ({ expiryTime }) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 0);

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
    onExpire: () => console.warn("onExpire called"),
  });

  useEffect(() => {
    restart(expiryTime);
  }, [expiryTime, restart]);

  const percentage = 66;

  return (
    <div className="flex flex-col justify-items-center items-center w-full h-full">
      <div className="w-3/5 md:w-4/12">
        <CircularProgressbarWithChildren
          value={66}
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
