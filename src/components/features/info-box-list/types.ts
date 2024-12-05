import { ReactElement } from "react";
import { Image } from "@/types/image";

export interface InfoBoxListProps {
  title: string;
  features: Feature[];
}

export interface Feature {
  icon: Image;
  title: string;
  intro: string;
  content: ReactElement;
}
