import { ImageField } from "@prismicio/types";
import type { ReactNode } from "react";

export interface IAccordion {
  index: number;
  heading: string;
  content: ReactNode;
  image?: ImageField;
  isExpanded?: boolean;
  onClick?: () => void;
}

export interface IAccordionsProps {
  heading: ReactNode;
  backgroundColour: "cream" | "blue";
  items: IAccordion[];
  className?: string;
}
