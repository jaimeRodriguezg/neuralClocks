'use client';
import { FC } from 'react';
import Button from '../ui/button/Button';
import { TfiReload } from 'react-icons/tfi';

interface CircularProgressActionsProps {
  pause: () => void;
  resume: () => void;
  isFinishProcess: boolean;
  restartProcess: () => void;
  restartTimer: () => void;
}

const CircularProgressActions: FC<CircularProgressActionsProps> = ({
  pause,
  resume,
  isFinishProcess,
  restartProcess,
  restartTimer,
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
            }}
          />
          <Button
            small
            outline
            label="Pause"
            onClick={() => {
              pause();
            }}
          />
          <Button small outline label="Restart" onClick={restartTimer} />
        </div>
      </div>
      {isFinishProcess && (
        <div
          onClick={restartProcess}
          className="p-4 md:py-1 md:px-2 bg-slate-100 rounded-full cursor-pointer hover:shadow-md transition mt-2"
        >
          <TfiReload size={24} />
        </div>
      )}
    </>
  );
};

export default CircularProgressActions;
