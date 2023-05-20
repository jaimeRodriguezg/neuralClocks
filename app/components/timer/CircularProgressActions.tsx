'use client';
import { FC, Dispatch, SetStateAction } from 'react';
import Button from '../ui/button/Button';
import { convertMinutesToExpiryDate } from '@/app/utils';
import { TfiReload } from 'react-icons/tfi';

interface CircularProgressActionsProps {
  pause: () => void;
  resume: () => void;
  restart: (newExpiryTimestamp: Date, autoStart?: boolean | undefined) => void;
  expiryMinutes: number;
  isFinishProcess: boolean;
  restartProcess: () => void;
  setIsPaused: (isPaused: boolean) => void;
}

const CircularProgressActions: FC<CircularProgressActionsProps> = ({
  pause,
  resume,
  restart,
  expiryMinutes,
  isFinishProcess,
  restartProcess,
  setIsPaused,
}) => {
  return (
    <>
      <div className="flex w-full justify-center align-middle mt-10">
        <div className="flex flex-wrap sm:flex-nowrap w-[500px] gap-10  pl-5 pr-5 sm:pl-3 sm:pr-3">
          <Button
            small
            outline
            label="Start"
            onClick={() => {
              resume();
              setIsPaused(false);
            }}
          />
          <Button
            small
            outline
            label="Pause"
            onClick={() => {
              pause();
              setIsPaused(true);
            }}
          />
          <Button
            small
            outline
            label="Restart"
            onClick={() => {
              restart(convertMinutesToExpiryDate(expiryMinutes));
              setIsPaused(false);
            }}
          />
        </div>
      </div>
      {isFinishProcess && (
        <div
          onClick={restartProcess}
          className="p-4 md:py-1 md:px-2 bg-slate-100 rounded-full cursor-pointer hover:shadow-md transition mt-6"
        >
          <TfiReload size={24} />
        </div>
      )}
    </>
  );
};

export default CircularProgressActions;
