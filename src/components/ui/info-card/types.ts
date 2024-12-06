import { Image } from "@/types/image";

export interface InfoCardProps {
  icon: Image;
  title: string;
  intro: string;
  variant: "default" | "feature";
  onClick: () => void;
}
