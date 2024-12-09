import { createClient } from "@/lib/prismic/prismicio";

import { formatReviewsPage } from "./format/reviews";
import { fetchSchema } from "./helpers";

export const fetchReviewsPage = async () => {
  const client = createClient();
  try {
    const { data } = await client.getSingle("reviews");
    const allTestimonials = await client.getAllByType("testimonial");
    //@ts-expect-error TODO
    const schema = await fetchSchema(data.schema);
    return formatReviewsPage(data, allTestimonials, schema);
  } catch (error) {
    console.error("Error fetching integrations:", error);
  }
};
