import { Metadata } from "next/types";

import { Hero } from "@/components/ui/hero";
import { formatMetaData } from "@/helpers/metaData";
import { schema } from "@/schema/product";
import { CallToAction } from "@/components/features/call-to-action";
import { fetchFeaturesLandingPage } from "@/lib/prismic/features";
import { FeaturesList } from "@/components/features/features-list";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await fetchFeaturesLandingPage();
  const url = `https://tutorcruncher.com/features`;

  return formatMetaData(meta.title, meta.description, url);
}

export default async function FeaturesPage() {
  const { heading, features } = await fetchFeaturesLandingPage();
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Hero heading={heading} headingVariant="div" />
      <FeaturesList features={features} />
      <CallToAction background="blue" />
    </div>
  );
}
