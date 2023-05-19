"use client";
import { usePathname, useRouter } from "next/navigation";
import { create } from "zustand";
import { ErouteNames } from "../types";

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
}

const initialState = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  interval: 4,
  count: 0,
};

//Manejador global para los temporizadores
const useTimerPomodoro = create<TimerProps>((set) => {
  const nextStep = () => {
    const currentRoute = window.location.pathname;

    if (currentRoute === ErouteNames.DEFAULT) {
      // Estamos en el temporizador pomodoro
      return "/shortBreak";
    } else if (currentRoute === "/shortBreak") {
      // Estamos en el temporizador de descanso corto
      let route = "";
      set((state) => {
        const count = state.count + 1; // Restamos 1 al contador de intervalos
        if (count === state.interval) {
          // Si hemos alcanzado el último intervalo, pasamos al temporizador largo
          route = "/longBreak";
        } else {
          // Si no es el último intervalo, volvemos al temporizador pomodoro
          route = "/";
        }
        //en este caso como debemos devolver el set, retorna undefined, por eso en la interfaz toma ese valor
        set((state) => ({ ...state, count }));
        return { ...state, count };
      });
      return route;
    } else if (currentRoute === "/longBreak") {
      // Estamos en el temporizador de descanso largo
      // router.push("/");
      return null;
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
    nextStep,
  };
});

export default useTimerPomodoro;
