import { ImageField } from "@prismicio/client";

export interface FeaturesListProps {
  features: {
    title: string;
    url: string;
    listText: string;
    listImage: ImageField;
  }[];
}
