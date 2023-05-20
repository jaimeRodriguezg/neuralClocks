export interface ISettingsInput {
  pomodoroTimer: number;
  shortTimer: number;
  longTimer: number;
  interval: number;
}

export interface IConfirmationInput {
  code: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IRegisterInput extends ILoginInput {
  confirmPassword: string;
}
