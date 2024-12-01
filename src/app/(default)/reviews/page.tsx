import { Metadata } from "next/types";

import { TestimonialList } from "@/components/features/testimonials/testimonials-list";
import { Body } from "@/components/ui/body";
import { Hero } from "@/components/ui/hero";
import { formatMetaData } from "@/helpers/metaData";
import { fetchReviewsPage } from "@/lib/prismic/reviews";
import generateWebAppSchema from "@/schema/web_application";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await fetchReviewsPage();
  const url = `https://tutorcruncher.com/reviews`;

  return formatMetaData(meta.title, meta.description, url);
}

const ReviewsPage = async () => {
  const { testimonials } = await fetchReviewsPage();
  return (
    <>
      <Hero heading="Reviews" />
      <Body containerSize="large" background="cream">
        <TestimonialList testimonials={testimonials} />
      </Body>
    </>
  );
};

export default ReviewsPage;
