'use client';
import { FC, useContext, useEffect, useRef, useState } from 'react';
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
  const { nextStep, count, restartProcess } = useContext(TimerContext);
  const [percentage, setPercentage] = useState<number>(0);
  const [isFinishProcess, setIsFinishProcess] = useState<boolean>(false);

  const { seconds, minutes, isRunning, pause, resume, restart } = useTimer({
    expiryTimestamp: convertMinutesToExpiryDate(expiryMinutes),
    autoStart: false,
    onExpire: () => {
      nextStep();
      if (pathName === ErouteNames.LONGBREAK) {
        setIsFinishProcess(true);
      }
    },
  });
  const counterMinutesRef = useRef<number>(-1);
  const initialMinutesRef = useRef<number>(expiryMinutes);

  const [valuePerPercentage, setValuePerPercentage] = useState(
    initialMinutesRef.current !== 0
      ? Math.floor(100 / initialMinutesRef.current)
      : 0,
  );

  //funcion que restable valores y el timer
  const restartTimer = () => {
    counterMinutesRef.current = -1;
    setPercentage(0);
    initialMinutesRef.current = expiryMinutes;
    setValuePerPercentage(
      initialMinutesRef.current !== 0
        ? Math.floor(100 / initialMinutesRef.current)
        : 0,
    );
    restart(convertMinutesToExpiryDate(expiryMinutes));
  };

  useEffect(() => {
    restartTimer();
  }, [expiryMinutes, restart]);

  useEffect(() => {
    // Ha pasado 1 minuto, calculamos el nuevo porcentaje de la barra circurlar
    setPercentage(valuePerPercentage * counterMinutesRef.current);
    counterMinutesRef.current = counterMinutesRef.current + 1;
  }, [minutes]);

  //verificamos si terminaron todos los timer
  useEffect(() => {
    if (pathName !== ErouteNames.LONGBREAK) setIsFinishProcess(false);
  }, [isFinishProcess]);

  return (
    <div className="flex flex-col  justify-items-center items-center w-full h-full">
      <div className="w-3/5 md:w-[400px] mt-5">
        <CircularProgress
          percentage={percentage}
          minutes={minutes}
          seconds={seconds}
        />
      </div>
      <CircularProgressDetail isRunning={isRunning} count={count} />
      <CircularProgressActions
        pause={pause}
        resume={resume}
        isFinishProcess={isFinishProcess}
        restartProcess={restartProcess}
        restartTimer={restartTimer}
      />
    </div>
  );
};

export default Timer;
