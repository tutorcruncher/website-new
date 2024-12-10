import { PrismicRichText } from "@prismicio/react";

export const formatTestimonials = (testimonials) => {
  return testimonials.map(({ data }) => ({
    companyLogo: data.company_logo,
    companyName: data.company_name,
    testimonial: <PrismicRichText field={data.testimonial} />,
    shortTestimonial: data.short_testimonial,
    reviewerImage: data.reviewer_image,
    reviewerName: data.reviewer_name,
    reviewerRole: data.reviewer_role,
  }));
};
