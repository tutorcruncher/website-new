import { ImageField } from "@prismicio/types";

export interface FeatureCardProps {
  icon: ImageField;
  title: string;
  intro: string;
  onClick: () => void;
}
