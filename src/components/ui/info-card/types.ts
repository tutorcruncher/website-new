import { Image } from "@/types/image";

export interface InfoCardProps {
  icon: Image;
  title: string;
  intro: string;
  onClick: () => void;
}
