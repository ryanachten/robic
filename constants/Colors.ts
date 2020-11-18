const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export enum Colors {
  white = "#fff",
  black = "#4A4A4A",
  grey = "#949494",
  red = "#ff5353",
  orange = "#ff9100",
  green = "#28a745",
  lilac = "#F4F3FF",
  purple = "#8050D0"
}

export const boxShadowStyles = {
  shadowColor: "rgba(0, 0, 0, 0.4)",
  shadowOffset: {
    height: 1,
    width: 1,
  },
  shadowOpacity: 1,
  shadowRadius: 1,
};

export default {
  light: {
    text: "#4A4A4A",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};
