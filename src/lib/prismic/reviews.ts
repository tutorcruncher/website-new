import { createClient } from "@/lib/prismic/prismicio";

import { formatReviewsPage } from "./format/reviews";
import { fetchSchemas } from "./helpers";

export const fetchReviewsPage = async () => {
  const client = createClient();
  try {
    const { data } = await client.getSingle("reviews");
    const allTestimonials = await client.getAllByType("testimonial");
    const schemas = await fetchSchemas(data.schemas);
    return formatReviewsPage(data, allTestimonials, schemas);
  } catch (error) {
    console.error("Error fetching integrations:", error);
  }
};
