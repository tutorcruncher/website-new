import { SliceZone } from "@prismicio/react";
import { regions } from "app/data/regions/regions";
import { Metadata } from "next/types";
import { components } from "slices";

import { PricingTiers } from "@/components/features/pricing-tiers";
import { Hero } from "@/components/ui/hero";
import { formatMetaData } from "@/helpers/metaData";
import { fetchPricingPageByUid } from "@/lib/prismic/pricing";

export async function generateMetadata({ params }): Promise<Metadata> {
  const { meta } = await fetchPricingPageByUid(params.uid);
  const url = `https://tutorcruncher.com/pricing`;

  return formatMetaData(meta.title, meta.description, url);
}

const PricingPage = async ({ params }) => {
  const { heading, slices } = await fetchPricingPageByUid(params.uid);
  const region = regions.find((region) => region.region_code === params.uid);
  return (
    <>
      <Hero heading={heading} headingVariant="div" />
      <PricingTiers region={region} />
      <SliceZone slices={slices} components={components} />
    </>
  );
};

export default PricingPage;
