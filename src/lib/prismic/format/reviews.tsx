import { PrismicRichText } from "@prismicio/react";

import {
  ReviewsDocumentData,
  Simplify,
  TestimonialDocument,
} from "../../../../prismicio-types";
import { formatTestimonials } from "./testimonials";

export const formatReviewsPage = (
  data: Simplify<ReviewsDocumentData>,
  allTestimonials: Simplify<TestimonialDocument>[],
) => {
  const heading = <PrismicRichText field={data.heading} />;

  const meta = {
    title: data.meta_title,
    description: data.meta_description,
  };

  const testimonials = formatTestimonials(allTestimonials);

  return { heading, meta, testimonials };
};
