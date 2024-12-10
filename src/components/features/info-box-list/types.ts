import { ReactElement } from "react";
import { ImageField } from "@prismicio/types";

export interface InfoBoxListProps {
  title: string;
  features: Feature[];
}

export interface Feature {
  icon: ImageField;
  title: string;
  intro: string;
  content: ReactElement;
}
