'use client';
import { ReactNode, FC, useReducer, useEffect } from 'react';
import {
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserSession,
  userPool,
} from '@/app/utils/cognito';
import { UserContext } from './UserContext';
import { userReducer } from './userReducer';

export interface UserState {
  cognitoUser: CognitoUser | null;
  userAttributes: CognitoUserAttribute[] | undefined;
  email: string | null;
  sub: string | null;
}

const UserInitialState: UserState = {
  cognitoUser: null,
  userAttributes: undefined,
  email: null,
  sub: null,
};

interface Props {
  children: ReactNode;
}

export const UserProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, UserInitialState);

  useEffect(() => {
    // Obtener el último usuario autenticado del localStorage y se cargan los atributos
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.getSession((err: unknown, session: CognitoUserSession) => {
        if (err) {
          localStorage.clear();
          return;
        }

        setCognitoUser(cognitoUser);
        cognitoUser.getUserAttributes((err, result) => {
          if (err) {
            console.log('err', err);
          }
          result?.map((attribute) => {
            switch (attribute.getName()) {
              case 'email':
                dispatch({
                  type: '[User] set Email',
                  payload: attribute.getValue(),
                });
              case 'sub':
                dispatch({
                  type: '[User] set Sub',
                  payload: attribute.getValue(),
                });
            }
          });
        });
      });

      // Si hay un usuario en el almacenamiento local, actualizar el estado
    }
  }, []);

  const setCognitoUser = (cognitoUser: CognitoUser) => {
    if (cognitoUser) {
      cognitoUser.getSession((err: unknown, session: CognitoUserSession) => {
        if (err) {
          localStorage.clear();
          return;
        }

        cognitoUser.getUserAttributes((err, result) => {
          result?.map((attribute) => {
            switch (attribute.getName()) {
              case 'email':
                dispatch({
                  type: '[User] set Email',
                  payload: attribute.getValue(),
                });
              case 'sub':
                dispatch({
                  type: '[User] set Sub',
                  payload: attribute.getValue(),
                });
            }
          });
        });
      });
    }
    dispatch({ type: '[User] set CognitoUser', payload: cognitoUser });
  };

  const signOut = () => {
    state.cognitoUser?.signOut();
    location.reload();
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        setCognitoUser,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
