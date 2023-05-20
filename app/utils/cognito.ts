import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
  CognitoUserSession,
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_UserPoolId ?? "",
  ClientId: process.env.NEXT_PUBLIC_ClientId ?? "",
};

const userPool = new CognitoUserPool(poolData);

export {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
  CognitoUserSession,
  userPool,
};
