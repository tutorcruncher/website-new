import { regions } from "app/data/regions/regions";
import { Metadata } from "next/types";

import { PricingTiers } from "@/components/features/pricing-tiers";
import { Hero } from "@/components/ui/hero";
import { formatMetaData } from "@/helpers/metaData";
import { fetchPricingPageByUid } from "@/lib/prismic/pricing";
import { RenderSchema } from "@/components/schema";
import { SliceZone } from "@prismicio/react";
import { components } from "slices";

export async function generateMetadata({ params }): Promise<Metadata> {
  const { meta } = await fetchPricingPageByUid(params.uid);
  const url = `https://tutorcruncher.com/pricing`;

  return formatMetaData(meta.title, meta.description, url);
}

const PricingPage = async ({ params }) => {
  const { heading, schema, slices } = await fetchPricingPageByUid(params.uid);
  const region = regions.find((region) => region.region_code === params.uid);
  return (
    <>
      <RenderSchema schema={schema} />
      <Hero heading={heading} headingVariant="div" />
      <PricingTiers region={region} />
      {/* {optionalExtras.length !== 0 ? (
        <OptionalExtrasList optionalExtras={optionalExtras} />
      ) : null} */}
      <SliceZone slices={slices} components={components} />
    </>
  );
};

export default PricingPage;
