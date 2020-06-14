import { keyframes } from "styled-components";

export const Gutters = {
  X_SMALL: "4px",
  SMALL: "8px",
  MEDIUM: "16px",
  LARGE: "24px",
  X_LARGE: "32px",
  DOUBLE_X: "64px",
};

export const Colors = {
  PRIMARY: "#1e90ff",
  PRIMARY_HOVER: "#0073e2",
  DARK_TEXT: "#484848",
  LIGHT_TEXT: "#ffffff",
  BLACK_TEXT: "#000000",
  WHITE: "#ffffff",
  DARK_GRAY: "#8a8a8a",
  LIGHT_GRAY: "#eeeeee",
  INPUT: "#e3f1ff",
  PRIMARY_LIGHT: "#e3f1ff",
  ERROR: "#ff0033",
  SUCCESS: "#4BB543",
};

export const Type = {
  CAPTION: "14px",
  BODY: "16px",
  SUB_HEADING: "20px",
  HEADING: "28px",
  TITLE: "36px",
};

const deviceSize = {
  MOBILE_S: "320px",
  MOBILE_M: "375px",
  MOBILE_L: "425px",
  TABLET: "768px",
  LAPTOP: "1024px",
  LAPTOP_L: "1440px",
  DESKTOP: "2560px",
};

export const BreakPoint = Object.keys(deviceSize).reduce((acc, cur) => {
  acc[cur] = `@media (min-width: ${deviceSize[cur]})`;
  return acc;
}, {});

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const fadeUp = keyframes`
  0% {
    opacity: 0;
    transform: translate(0, ${Gutters.LARGE});
  }

  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
`;
