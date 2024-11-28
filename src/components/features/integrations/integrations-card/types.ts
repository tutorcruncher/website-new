import { Image } from "@/types/image";

export interface IntegrationCardProps {
  logo: Image;
  title: string;
  intro: string;
  onClick: () => void;
}
