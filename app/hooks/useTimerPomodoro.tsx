"use client";
import { create } from "zustand";
import { ErouteNames } from "../types";

// OTRA FORMA DE MANEJAR EL TIMER USANDO HOOKS

interface TimerProps {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  interval: number;
  count: number;
  setPomodoro: (minutes: number) => void;
  setShortBreak: (minutes: number) => void;
  setLongBreak: (minutes: number) => void;
  setInterval: (intervals: number) => void;
  nextStep: () => string | null | undefined;
  restartProcess: () => void;
}

const initialState = {
  pomodoro: 1,
  shortBreak: 1,
  longBreak: 1,
  interval: 2,
  count: 0,
};

//Manejador global para los temporizadores
const useTimerPomodoro = create<TimerProps>((set, get) => {
  const nextStep = () => {
    const currentRoute = window.location.pathname;

    // Estamos en el temporizador pomodoro y todavía no se completan los intervalos
    if (
      currentRoute === ErouteNames.DEFAULT &&
      get().count !== get().interval
    ) {
      console.log(ErouteNames.SHORTBREAK);
      return ErouteNames.SHORTBREAK;
    } else if (currentRoute === ErouteNames.SHORTBREAK) {
      // Estamos en el temporizador de descanso corto, actualizamos el contador
      set((state) => {
        const count = state.count + 1; // Sumamos 1 al contador de intervalos
        set((state) => ({ ...state, count }));
        return { ...state, count };
      });
      return ErouteNames.DEFAULT;
    } else {
      return ErouteNames.LONGBREAK;
    }
  };
  return {
    pomodoro: initialState.pomodoro,
    shortBreak: initialState.shortBreak,
    longBreak: initialState.longBreak,
    interval: initialState.interval,
    count: initialState.count,
    setPomodoro: (minutes: number) =>
      set((state) => ({ ...state, pomodoro: minutes })),
    setShortBreak: (minutes: number) =>
      set((state) => ({ ...state, shortBreak: minutes })),
    setLongBreak: (minutes: number) =>
      set((state) => ({ ...state, longBreak: minutes })),
    setInterval: (intervals: number) =>
      set((state) => ({ ...state, interval: intervals })),
    restartProcess: () =>
      set(() => ({
        count: 0,
        pomodoro: get().pomodoro,
        shortBreak: get().shortBreak,
        longBreak: get().longBreak,
        interval: get().interval,
      })),
    nextStep,
  };
});

export default useTimerPomodoro;
