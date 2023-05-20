'use client';
import { createContext } from 'react';

interface ContextProps {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  interval: number;
  count: number;
  setPomodoro: (minutes: number) => void;
  setShortBreak: (minutes: number) => void;
  setLongBreak: (minutes: number) => void;
  setInterval: (intervals: number) => void;
  nextStep: () => void;
  restartProcess: () => void;
  setCounter: (count: number) => void;
}

export const TimerContext = createContext({} as ContextProps);
