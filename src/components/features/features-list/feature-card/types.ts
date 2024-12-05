import { Image } from "@/types/image";

export interface FeatureCardProps {
  icon: Image;
  title: string;
  intro: string;
  onClick: () => void;
}
