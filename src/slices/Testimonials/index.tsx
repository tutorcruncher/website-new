import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import { TestimonialSlider } from "@/components/features/testimonials/testimonial-slider";
import { formatTestimonials } from "@/lib/prismic/format/testimonials";
import { createClient } from "@/lib/prismic/prismicio";

/**
 * Props for `Testimonials`.
 */
export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

/**
 * Component for "Testimonials" Slices.
 */

const queryOptions = {
  page: 1,
} as any;

const Testimonials = async ({ slice }: TestimonialsProps) => {
  const client = createClient();

  let testimonials = [];
  const testimonialIds = slice.primary.testimonials.map(
    (item) => item.testimonial.id
  );

  if (testimonialIds.length !== 0) {
    const { results } = await client.getByIDs(testimonialIds, queryOptions);
    testimonials = results;
  } else {
    const { results } = await client.getByType("testimonial", queryOptions);
    testimonials = results;
  }

  const formattedTestimonials = formatTestimonials(testimonials);

  return (
    <TestimonialSlider
      heading={
        slice.primary.heading.length > 0 ? (
          <PrismicRichText field={slice.primary.heading} />
        ) : undefined
      }
      testimonials={formattedTestimonials}
    />
  );
};

export default Testimonials;
