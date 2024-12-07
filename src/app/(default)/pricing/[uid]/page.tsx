import { SliceZone } from "@prismicio/react";
import { regions } from "app/data/regions/regions";
import { Metadata } from "next/types";
import { components } from "slices";

import { PricingTiers } from "@/components/features/pricing-tiers";
import { Hero } from "@/components/ui/hero";
import { formatMetaData } from "@/helpers/metaData";
import { fetchPricingPageByUid } from "@/lib/prismic/pricing";
import generateWebAppSchema from "@/schema/web_application";
import { IntegrationsList } from "@/components/features/integrations/integrations-list";
import { OptionalExtrasList } from "@/components/features/optional-extras-list";

export async function generateMetadata({ params }): Promise<Metadata> {
  const { meta } = await fetchPricingPageByUid(params.uid);
  const url = `https://tutorcruncher.com/pricing`;

  return formatMetaData(meta.title, meta.description, url);
}

const PricingPage = async ({ params }) => {
  const { heading, optionalExtras } = await fetchPricingPageByUid(params.uid);
  const region = regions.find((region) => region.region_code === params.uid);
  const schemaData = generateWebAppSchema(region);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Hero heading={heading} headingVariant="div" />
      <PricingTiers region={region} />
      {optionalExtras.length !== 0 ? (
        <OptionalExtrasList optionalExtras={optionalExtras} />
      ) : null}
    </>
  );
};

export default PricingPage;
