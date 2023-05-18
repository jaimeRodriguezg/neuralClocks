import { create } from "zustand";

interface TimerProps {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  inteval: number;
  setPomodoro: (minutes: number) => void;
  setShortBreak: (minutes: number) => void;
  setLongBreak: (minutes: number) => void;
  setInteval: (intervals: number) => void;
}

const initialState = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  inteval: 4,
};

//Manejador global para los temporizadores
const useTimer = create<TimerProps>((set) => ({
  pomodoro: initialState.pomodoro,
  shortBreak: initialState.shortBreak,
  longBreak: initialState.longBreak,
  inteval: initialState.inteval,
  setPomodoro: (minutes: number) =>
    set((state) => ({ ...state, pomodoro: minutes })),
  setShortBreak: (minutes: number) =>
    set((state) => ({ ...state, shortBreak: minutes })),
  setLongBreak: (minutes: number) =>
    set((state) => ({ ...state, longBreak: minutes })),
  setInteval: (intervals: number) =>
    set((state) => ({ ...state, inteval: intervals })),
}));

export default useTimer;
