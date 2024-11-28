import { createClient } from "@/lib/prismic/prismicio";

import { formatReviewsPage } from "./format/reviews";

export const fetchReviewsPage = async () => {
  const client = createClient();
  try {
    const { data } = await client.getSingle("reviews");
    const allTestimonials = await client.getAllByType("testimonial");
    return formatReviewsPage(data, allTestimonials);
  } catch (error) {
    console.error("Error fetching integrations:", error);
  }
};
