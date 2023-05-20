'use client';
import { FC, useContext } from 'react';
import { usePathname } from 'next/navigation';
import { ErouteNames } from '@/app/types';
import { TimerContext } from '@/app/context';

interface CircularProgressDetailProps {
  isRunning: boolean;
  count: number;
}

export const CircularProgressDetail: FC<CircularProgressDetailProps> = ({
  isRunning,
  count,
}) => {
  const pathName = usePathname();
  const { interval } = useContext(TimerContext);

  return (
    <>
      <div className="flex justify-center mt-2">
        {pathName === ErouteNames.DEFAULT ? (
          <p className="text-white font-semibold text-3xl">
            {isRunning ? 'Focus' : 'Break'}
          </p>
        ) : pathName === ErouteNames.SHORTBREAK ? (
          <p className="text-white font-semibold text-3xl">{'Break'}</p>
        ) : (
          <p className="text-white font-semibold text-3xl">{'Rest'}</p>
        )}
      </div>
      <p className="text-white text-2xl">
        {count}/{interval}
      </p>
      <div className="w-full">
        <div className="flex justify-center"></div>;
      </div>
    </>
  );
};
