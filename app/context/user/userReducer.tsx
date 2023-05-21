import { UserState } from './UserProvider';
import { CognitoUser, CognitoUserAttribute } from '@/app/utils/cognito';

type UserActionType =
  | {
      type: '[User] set CognitoUser';
      payload: CognitoUser;
    }
  | {
      type: '[User] set UserAttributes';
      payload: CognitoUserAttribute[];
    }
  | {
      type: '[User] set Email';
      payload: string;
    }
  | {
      type: '[User] set Sub';
      payload: string;
    };

export const userReducer = (
  state: UserState,
  action: UserActionType,
): UserState => {
  switch (action.type) {
    case '[User] set CognitoUser':
      return {
        ...state,
        cognitoUser: action.payload,
      };
    case '[User] set UserAttributes':
      return {
        ...state,
        userAttributes: [...action.payload],
      };
    case '[User] set Email':
      return {
        ...state,
        email: action.payload,
      };
    case '[User] set Sub':
      return {
        ...state,
        sub: action.payload,
      };
    default:
      return state;
  }
};
