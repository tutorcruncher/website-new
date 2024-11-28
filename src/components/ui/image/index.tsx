import { PrismicNextImage } from "@prismicio/next";

export const Image = ({ image }) => {
  return <PrismicNextImage field={image} />;
};
