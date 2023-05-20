'use client';
import { FC, useContext, useEffect, useState } from 'react';
import { useTimer } from 'react-timer-hook';
import { convertMinutesToExpiryDate } from '../../utils/';
import { TimerContext } from '@/app/context';
import { usePathname } from 'next/navigation';
import { ErouteNames } from '@/app/types';
import { CircularProgress } from './CircularProgress';
import { CircularProgressDetail } from './CircularProgressDetail';
import CircularProgressActions from './CircularProgressActions';
interface TimerProps {
  expiryMinutes: number;
}

const Timer: FC<TimerProps> = ({ expiryMinutes }) => {
  const pathName = usePathname();
  const { nextStep, count, restartProcess, isPaused, setIsPaused } =
    useContext(TimerContext);
  const [progressValue, setProgressValue] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [isFinishProcess, setIsFinishProcess] = useState(false);

  //para evitar problemas de renderizado entre el cliente y el servidor, seteamos en 0 como initial state en el useTimer
  const time = new Date();
  time.setSeconds(time.getSeconds() + 0);

  const { seconds, hours, minutes, isRunning, pause, resume, restart } =
    useTimer({
      expiryTimestamp: time,
      autoStart: false,
      onExpire: () => {
        nextStep();
        if (pathName === ErouteNames.LONGBREAK) {
          setIsFinishProcess(true);
        }
      },
    });

  //seteamos los minutos al momento de renderizar el componente
  useEffect(() => {
    const expiryDate = convertMinutesToExpiryDate(expiryMinutes);
    restart(expiryDate);
  }, [expiryMinutes, restart]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        // Verificar si el timer está en pausa
        setProgressValue((prevValue) => prevValue + 60); // Incrementar en 60 segundos (1 minuto)
      }
    }, 60000); // Actualizar cada minuto (60000 milisegundos)

    return () => clearInterval(interval);
  }, [isPaused]); // Actualizar el intervalo solo cuando cambie el estado de pausa

  useEffect(() => {
    if (progressValue >= expiryMinutes * 60) {
      // Si hemos alcanzado el límite de segundos, detenemos el timer
      pause();
    }
  }, [progressValue, expiryMinutes, pause]);

  useEffect(() => {
    //calculamos el porcentage completado
    setPercentage(Math.min((progressValue / (expiryMinutes * 60)) * 100, 100));
  }, [progressValue, expiryMinutes]);

  //verificamos si terminaron todos los timer
  useEffect(() => {
    if (pathName !== ErouteNames.LONGBREAK) setIsFinishProcess(false);
  }, [isFinishProcess]);

  return (
    <div className="flex flex-col  justify-items-center items-center w-full h-full">
      <div className="w-3/5 md:w-[400px] mt-5">
        <CircularProgress
          hours={hours}
          percentage={percentage}
          minutes={minutes}
          seconds={seconds}
        />
      </div>
      <CircularProgressDetail isRunning={isRunning} count={count} />
      <CircularProgressActions
        pause={pause}
        resume={resume}
        restart={restart}
        expiryMinutes={expiryMinutes}
        isFinishProcess={isFinishProcess}
        restartProcess={restartProcess}
        setIsPaused={setIsPaused}
      />
    </div>
  );
};

export default Timer;
