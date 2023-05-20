'use client';
import { FC, ReactNode, useEffect, useReducer } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { TimerContext } from './TimerContext';
import { timerReducer } from './timerReducer';
import { ErouteNames } from '../types';

export interface TimerState {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  interval: number;
  count: number;
}

const TimerInitialState: TimerState = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  interval: 4,
  count: 0,
};

interface Props {
  children: ReactNode;
}

export const TimerProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, TimerInitialState);
  const currentRoute = usePathname();
  const router = useRouter();

  //Precargamos paginas para mejorar UX
  useEffect(() => {
    router.prefetch(ErouteNames.DEFAULT);
    router.prefetch(ErouteNames.SHORTBREAK);
    router.prefetch(ErouteNames.LONGBREAK);
  }, []);

  const nextStep = () => {
    // Estamos en el temporizador pomodoro y todavía no se completan los intervalos
    if (
      currentRoute === ErouteNames.DEFAULT &&
      state.count !== state.interval
    ) {
      router.push(ErouteNames.SHORTBREAK);
    } else if (currentRoute === ErouteNames.SHORTBREAK) {
      // Estamos en el temporizador de descanso corto, actualizamos el contador

      const newCount = state.count + 1;

      dispatch({ type: '[Timer] - set Counter', payload: newCount });
      router.push(ErouteNames.DEFAULT);
    } else {
      router.push(ErouteNames.LONGBREAK);
    }
  };

  const setPomodoro = (minutes: number) => {
    dispatch({ type: '[Timer] - set Pomodoro', payload: minutes });
  };
  const setShortBreak = (minutes: number) => {
    dispatch({ type: '[Timer] - set ShortBreak', payload: minutes });
  };
  const setLongBreak = (minutes: number) => {
    dispatch({ type: '[Timer] - set LongBreak', payload: minutes });
  };
  const setInterval = (intervals: number) => {
    dispatch({ type: '[Timer] - set Interval', payload: intervals });
  };

  const setCounter = (counter: number) => {
    dispatch({ type: '[Timer] - set Counter', payload: counter });
  };

  //se restablece todo el proceso y se redirije a la ruta default
  const restartProcess = () => {
    const newState: TimerState = {
      count: 0,
      interval: state.interval,
      longBreak: state.longBreak,
      pomodoro: state.pomodoro,
      shortBreak: state.pomodoro,
    };
    dispatch({ type: '[Timer] - restart', payload: newState });
    if (currentRoute === ErouteNames.DEFAULT) {
      router.refresh();
    } else {
      router.push(ErouteNames.DEFAULT);
    }
  };

  return (
    <TimerContext.Provider
      value={{
        ...state,
        //Methods
        nextStep,
        setPomodoro,
        setShortBreak,
        setLongBreak,
        setInterval,
        restartProcess,
        setCounter,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
