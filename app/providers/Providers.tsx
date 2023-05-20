import { ReactNode, FC } from 'react';
import { TimerProvider } from '@/app/context/TimerProvider';

interface Props {
  children: ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
  return <TimerProvider>{children}</TimerProvider>;
};

export default Providers;
