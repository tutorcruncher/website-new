import { PrismicRichText } from "@prismicio/react";

import { PricingDocumentData, Simplify } from "../../../../prismicio-types";
import { prismicToNextImage } from "@/helpers/prismicToNextImage";
import { OptionalExtra } from "@/components/features/optional-extras-list/types";

export const formatPricingPage = (
  data: Simplify<PricingDocumentData>,
  schema
) => {
  const heading = <PrismicRichText field={data.heading} />;

  const meta = {
    title: data.meta_title,
    description: data.meta_description,
  };

  const optionalExtras: OptionalExtra[] = data.optional_extras.map(
    ({ extra }) => {
      return {
        title: extra.data?.title,
        image: prismicToNextImage(extra.data?.image),
        content: <PrismicRichText field={extra.data?.content} />,
        category: extra.data?.category,
      };
    }
  );

  return { heading, meta, optionalExtras, schema };
};
