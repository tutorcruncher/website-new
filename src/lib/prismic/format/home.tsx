import { PrismicRichText } from "@prismicio/react";

import { HomePageDocumentData, Simplify } from "../../../../prismicio-types";

export const formatHomePage = (data: Simplify<HomePageDocumentData>) => {
  const heading = <PrismicRichText field={data.heading} />;
  const intro = data.intro;
  const slices = data.slices;

  const meta = {
    title: data.meta_title,
    description: data.meta_description,
  };

  return { heading, intro, slices, meta };
};