import { VictoryBarProps } from "victory-bar";
import { Colors } from "../../constants/Colors";
import { lerpColor } from "../../utilities/styleHelpers";

export const getMaxMin = (
  props?: VictoryBarProps
): { max?: number; min?: number } => {
  let max, min;
  if (props && props.x && props.data) {
    const data: number[] = props.data.map((d) => d[props.y as string]);
    max = Math.max(...data);
    min = Math.min(...data);
  }
  return { max, min };
};

export const getColour = ({
  y,
  defaultColor,
  max,
  min,
}: {
  y: number;
  defaultColor: string;
  max?: number;
  min?: number;
}): string => {
  let colour;
  // Handle positive colour range
  if (y >= 0 && max) {
    const percent = y / max;
    colour = lerpColor(Colors.orange, Colors.red, percent);
  }
  // Handle negative colour range
  else if (y < 0 && min) {
    const percent = Math.abs(y) / Math.abs(min);
    colour = lerpColor(Colors.lilac, Colors.purple, percent);
  }
  // Handle edge cases where max or min
  else {
    return defaultColor;
  }

  // Check if hex is a valid colour
  if (!/^#[0-9A-F]{6}$/i.test(colour)) {
    return defaultColor;
  }

  return colour;
};
