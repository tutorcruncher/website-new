import { Metadata } from "next/types";

import { IntegrationsList } from "@/components/features/integrations/integrations-list";
import { Hero } from "@/components/ui/hero";
import { formatMetaData } from "@/helpers/metaData";
import { fetchIntegrationsPage } from "@/lib/prismic/integrations";
import { CallToAction } from "@/components/features/call-to-action";
import { RenderSchemas } from "@/components/schema";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await fetchIntegrationsPage();
  const url = `https://tutorcruncher.com/integrations`;

  return formatMetaData(meta.title, meta.description, url);
}

export default async function IntegrationsPage() {
  const { heading, integrations, schemas } = await fetchIntegrationsPage();
  return (
    <>
      <RenderSchemas schemas={schemas} />
      <Hero heading={heading} headingVariant="div" />
      <IntegrationsList integrations={integrations} />
      <CallToAction background="blue" />
    </>
  );
}
