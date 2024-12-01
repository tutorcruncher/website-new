import { Image } from "@/types/image";

export interface FeaturesListProps {
  features: {
    title: string;
    url: string;
    listText: string;
    listImage: Image;
  }[];
}
