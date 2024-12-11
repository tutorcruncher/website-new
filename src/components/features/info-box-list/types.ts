import { ReactElement } from "react";
import { ImageField } from "@prismicio/types";
import { BackgroundColour } from "@/types/backgroundColor";

export interface InfoBoxListProps {
  title: string;
  features: Feature[];
  background: BackgroundColour;
}

export interface Feature {
  icon: ImageField;
  title: string;
  intro: string;
  content: ReactElement;
}
