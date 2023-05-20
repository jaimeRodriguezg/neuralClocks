'use client';
import { FC } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CircularProgressProps {
  percentage: number;
  minutes: number;
  seconds: number;
  hours: number;
}

export const CircularProgress: FC<CircularProgressProps> = ({
  percentage,
  minutes,
  seconds,
  hours,
}) => {
  return (
    <CircularProgressbarWithChildren
      value={percentage}
      className="h-auto opacity-90"
      strokeWidth={5}
      styles={buildStyles({
        textColor: 'red',
        pathColor: 'white',
        trailColor: 'transparent',
      })}
    >
      <div className="flex justify-center text-6xl md:text-9xl text-white">
        <span>{hours}</span>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </CircularProgressbarWithChildren>
  );
};
