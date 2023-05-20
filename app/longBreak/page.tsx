'use client';
import { useContext } from 'react';
import { TimerContext } from '../context';
import Timer from '../components/timer/Timer';

const LongBreak = () => {
  const { longBreak } = useContext(TimerContext);
  return <Timer expiryMinutes={longBreak} />;
};

export default LongBreak;
