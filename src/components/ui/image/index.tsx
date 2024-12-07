import { PrismicNextImage } from "@prismicio/next";

type ImageProps = {
  image: any;
  loading?: "eager" | "lazy";
  unoptimized?: boolean;
};

export const Image = ({
  image,
  loading = "lazy",
  unoptimized = false,
}: ImageProps) => {
  return (
    <PrismicNextImage
      field={image}
      unoptimized={unoptimized}
      loading={loading}
      alt={image.alt || ""}
    />
  );
};
