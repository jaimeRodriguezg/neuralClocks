'use client';
import { createContext } from 'react';

interface ContextProps {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  interval: number;
  count: number;
  isPaused: boolean;
  percentage: number;
  setPomodoro: (minutes: number) => void;
  setShortBreak: (minutes: number) => void;
  setLongBreak: (minutes: number) => void;
  setInterval: (intervals: number) => void;
  nextStep: () => void;
  restartProcess: () => void;
  setIsPaused: (isPaused: boolean) => void;
  setCounter: (count: number) => void;
  setPercentage: (percentage: number) => void;
}

export const TimerContext = createContext({} as ContextProps);
