import { ErouteNames } from "../types";

export const getImageByRoute = (route: ErouteNames): string => {
  switch (route) {
    case ErouteNames.DEFAULT:
      return "/background/default.jpg";
    case ErouteNames.SHORTBREAK:
      return "/background/shortBreak.jpg";
    case ErouteNames.LONGBREAK:
      return "/background/longBreak.jpg";
    default:
      return "/background/default.jpg";
  }
};
