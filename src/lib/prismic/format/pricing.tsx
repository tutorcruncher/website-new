import { PrismicRichText } from "@prismicio/react";

import { PricingDocumentData, Simplify } from "../../../../prismicio-types";
import { OptionalExtra } from "@/components/features/optional-extras-list/types";

export const formatPricingPage = (
  data: Simplify<PricingDocumentData>,
  schemas
) => {
  const heading = <PrismicRichText field={data.heading} />;

  const meta = {
    title: data.meta_title,
    description: data.meta_description,
  };

  const pricing = {
    currency: data.currency,
    enterprise_limit: data.enterprise_limit,
    payg: {
      base_price: data.payg_base_price,
      fees: data.payg_payment_fees,
    },
    startup: {
      base_price: data.startup_base_price,
      fees: data.startup_payment_fees,
    },
    enterprise: {
      base_price: data.enterprise_base_price,
    }
  }

  const slices = data.slices;

  const optionalExtras: OptionalExtra[] = data.optional_extras.map(
    ({ extra }) => {
      return {
        title: extra.data?.title,
        image: extra.data?.image,
        content: <PrismicRichText field={extra.data?.content} />,
        category: extra.data?.category,
      };
    }
  );

  return { heading, meta, optionalExtras, schemas, slices, pricing };
};
