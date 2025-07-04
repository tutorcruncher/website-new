import { Metadata } from "next/types";

import { PricingTiers } from "@/components/features/pricing-tiers";
import { Hero } from "@/components/ui/hero";
import { formatMetaData } from "@/helpers/metaData";
import { fetchPricingPageByUid } from "@/lib/prismic/pricing";
import { RenderSchemas } from "@/components/schema";
import { SliceZone } from "@prismicio/react";
import { components } from "slices";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }): Promise<Metadata> {
  try {
    const { meta } = await fetchPricingPageByUid(params.uid);
    const url = `https://tutorcruncher.com/pricing`;

    return formatMetaData(meta.title, meta.description, url);
  } catch {
    return null;
  }
}

const PricingPage = async ({ params }) => {
  try {
    const { heading, schemas, slices, pricing } = await fetchPricingPageByUid(
      params.uid
    );
    const region = params.uid;
    return (
      <>
        <RenderSchemas schemas={schemas} />
        <Hero heading={heading} headingVariant="div" />
        <PricingTiers region={region} pricing={pricing} />
        <SliceZone slices={slices} components={components} />
      </>
    );
  } catch {
    return notFound();
  }
};

export default PricingPage;
