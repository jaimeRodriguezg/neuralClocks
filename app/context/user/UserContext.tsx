'use client';
import { CognitoUser } from '@/app/utils/cognito';
import { createContext } from 'react';

interface ContextProps {
  cognitoUser: CognitoUser | null;
  sub: string | null;
  email: string | null;
  setCognitoUser: (cognitoUser: CognitoUser) => void;
  signOut: () => void;
}

export const UserContext = createContext({} as ContextProps);
