import { BackgroundColour } from "@/types/backgroundColor";

const validColors: BackgroundColour[] = ["cream", "blue", "white"];

export const backgroundColor = (background: string): BackgroundColour => {
  const lowerCaseBackground = background?.toLocaleLowerCase();
  return validColors.includes(lowerCaseBackground as BackgroundColour)
    ? (lowerCaseBackground as BackgroundColour)
    : "white";
};
