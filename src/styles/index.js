export const Gutters = {
  X_SMALL: "4px",
  SMALL: "8px",
  MEDIUM: "16px",
  LARGE: "24px",
  X_LARGE: "32px",
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
  ERROR: "#ff0033",
};

export const Type = {
  CAPTION: "14px",
  BODY: "16px",
  SUB_HEADING: "24px",
  HEADING: "32px",
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
