import type { ReactNode } from "react";

export interface IAccordion {
  index: number;
  heading: string;
  content: ReactNode;
  image?: {
    url: string;
    alt?: string;
    width: number;
    height: number;
    onLeft?: boolean;
  };
  isExpanded?: boolean;
  onClick?: () => void;
}

export interface IAccordionsProps {
  heading: ReactNode;
  backgroundColour: "cream" | "blue";
  items: IAccordion[];
  className?: string;
}
