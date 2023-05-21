'use client';
import { useContext } from 'react';
import { TimerContext } from '../context/timer';
import Timer from '../components/timer/Timer';

const ShortBreak = () => {
  const { shortBreak } = useContext(TimerContext);
  return <Timer expiryMinutes={shortBreak} />;
};

export default ShortBreak;
