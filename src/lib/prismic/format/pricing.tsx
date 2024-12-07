import { PrismicRichText } from "@prismicio/react";

import {
  OptionalExtraDocument,
  PricingDocumentData,
  Simplify,
} from "../../../../prismicio-types";

export const formatPricingPage = (
  data: Simplify<PricingDocumentData>,
  allOptionalExtras: Simplify<OptionalExtraDocument>[]
) => {
  const heading = <PrismicRichText field={data.heading} />;

  const meta = {
    title: data.meta_title,
    description: data.meta_description,
  };

  const optionalExtras = allOptionalExtras.map(({ data }) => ({
    title: data.title,
    category: data.category,
    content: <PrismicRichText field={data.content} />,
  }));

  return { heading, meta, optionalExtras };
};
