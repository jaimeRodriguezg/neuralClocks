'use client';
import { ReactNode, FC } from 'react';
import { TimerProvider } from '@/app/context/timer/TimerProvider';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { UserProvider } from '../context/user/UserProvider';
interface Props {
  children: ReactNode;
}

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`,
  cache: new InMemoryCache(),
});

const Providers: FC<Props> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <TimerProvider>{children}</TimerProvider>
      </UserProvider>
    </ApolloProvider>
  );
};

export default Providers;
