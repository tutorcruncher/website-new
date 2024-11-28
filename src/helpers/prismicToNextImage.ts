import { ImageField } from "@prismicio/client";

export const prismicToNextImage = (image: ImageField) => {
  return {
    url: image.url,
    alt: image.alt || "",
    width: image.dimensions.width,
    height: image.dimensions.height,
  };
};
