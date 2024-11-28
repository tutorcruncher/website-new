import { PrismicRichText } from "@prismicio/react";

import { prismicToNextImage } from "@/helpers/prismicToNextImage";

export const formatTestimonials = (testimonials) => {
  return testimonials.map(({ data }) => ({
    companyLogo: prismicToNextImage(data.company_logo),
    testimonial: <PrismicRichText field={data.testimonial} />,
    shortTestimonial: data.short_testimonial,
    reviewerImage: prismicToNextImage(data.reviewer_image),
    reviewerName: data.reviewer_name,
    reviewerRole: data.reviewer_role,
  }));
};
