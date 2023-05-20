import { TimerState } from './TimerProvider';

type TimerActionType =
  | {
      type: '[Timer] - set Pomodoro';
      payload: number;
    }
  | {
      type: '[Timer] - set ShortBreak';
      payload: number;
    }
  | {
      type: '[Timer] - set LongBreak';
      payload: number;
    }
  | {
      type: '[Timer] - set Interval';
      payload: number;
    }
  | {
      type: '[Timer] - set Counter';
      payload: number;
    }
  | {
      type: '[Timer] - restart';
      payload: TimerState;
    }
  | {
      type: '[Timer] - set isPaused';
      payload: boolean;
    }
  | {
      type: '[Timer] - set Counter';
      payload: number;
    }
  | {
      type: '[Timer] - set Percentage';
      payload: number;
    };

export const timerReducer = (
  state: TimerState,
  action: TimerActionType,
): TimerState => {
  switch (action.type) {
    case '[Timer] - set Pomodoro':
      return {
        ...state,
        pomodoro: action.payload,
      };
    case '[Timer] - set ShortBreak':
      return {
        ...state,
        shortBreak: action.payload,
      };
    case '[Timer] - set LongBreak':
      return {
        ...state,
        longBreak: action.payload,
      };
    case '[Timer] - set Interval':
      return {
        ...state,
        interval: action.payload,
      };
    case '[Timer] - set Counter':
      return {
        ...state,
        count: action.payload,
      };
    case '[Timer] - restart':
      return {
        ...action.payload,
      };
    case '[Timer] - set isPaused':
      return {
        ...state,
        isPaused: action.payload,
      };
    case '[Timer] - set Counter':
      return {
        ...state,
        count: action.payload,
      };
    case '[Timer] - set Percentage':
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
};
