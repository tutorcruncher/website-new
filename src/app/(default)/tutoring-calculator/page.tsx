import { Metadata } from "next/types";

import { Body } from "@/components/ui/body";
import { Hero } from "@/components/ui/hero";
import { formatMetaData } from "@/helpers/metaData";
import { TutoringCalculator } from "@/components/features/tutoring-calculator";
import { fetchTutoringCalculatorPage } from "@/lib/prismic/tutoring-calculator";
import { RenderSchemas } from "@/components/schema";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await fetchTutoringCalculatorPage();

  const url = "https://tutorcruncher.com/tutoring-calculator";

  return formatMetaData(meta.title, meta.description, url);
}

export default async function TutoringCalculatorPage() {
  const { heading, intro, statement, schemas } =
    await fetchTutoringCalculatorPage();
  return (
    <>
      <RenderSchemas schemas={schemas} />
      <Hero heading={heading} headingVariant="div" />
      <Body containerSize="small" background="cream" spacing="small">
        <TutoringCalculator intro={intro} statement={statement} />
      </Body>
    </>
  );
}
