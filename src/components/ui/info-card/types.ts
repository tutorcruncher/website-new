import { ImageField } from "@prismicio/client";

export interface InfoCardProps {
  title: string;
  icon?: ImageField;
  intro?: string;
  variant?: "default" | "feature";
  imageFilter?: boolean;
  onClick: () => void;
}
