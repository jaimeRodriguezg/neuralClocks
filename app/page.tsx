'use client';
import { useContext } from 'react';
import { TimerContext } from './context/timer';
import Timer from '@/app/components/timer/Timer';

export default function Home() {
  const { pomodoro } = useContext(TimerContext);
  return <Timer expiryMinutes={pomodoro} />;
}
