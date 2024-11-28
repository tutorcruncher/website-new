import { PrismicRichText } from "@prismicio/react";

import { PricingDocumentData, Simplify } from "../../../../prismicio-types";

export const formatPricingPage = (data: Simplify<PricingDocumentData>) => {
  const heading = <PrismicRichText field={data.heading} />;
  const slices = data.slices;

  const meta = {
    title: data.meta_title,
    description: data.meta_description,
  };

  return { heading, slices, meta };
};
