import { PrismicNextImage } from "@prismicio/next";

export const Image = ({ image, unoptimized = false }) => {
  return <PrismicNextImage field={image} unoptimized={unoptimized} />;
};
