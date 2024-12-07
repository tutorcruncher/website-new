import { Image } from "@/types/image";

export interface InfoCardProps {
  title: string;
  icon?: Image;
  intro?: string;
  variant?: "default" | "feature";
  onClick: () => void;
}
