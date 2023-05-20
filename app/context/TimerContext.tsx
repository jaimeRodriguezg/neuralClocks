'use client';
import { createContext } from 'react';

interface ContextProps {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  interval: number;
  count: number;
  isPaused: boolean;
  setPomodoro: (minutes: number) => void;
  setShortBreak: (minutes: number) => void;
  setLongBreak: (minutes: number) => void;
  setInterval: (intervals: number) => void;
  nextStep: () => void;
  restartProcess: () => void;
  setIsPaused: (isPaused: boolean) => void;
}

export const TimerContext = createContext({} as ContextProps);
