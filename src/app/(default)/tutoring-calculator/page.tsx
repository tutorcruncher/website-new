import { Metadata } from "next/types";

import { Body } from "@/components/ui/body";
import { Hero } from "@/components/ui/hero";
import { formatMetaData } from "@/helpers/metaData";
import { TutoringCalculator } from "@/components/features/tutoring-calculator";

export async function generateMetadata(): Promise<Metadata> {
  const url = "https://tutorcruncher.com/tutoring-calculator";

  return formatMetaData("Tutoring Calculator | TutorCruncher", "", url);
}

export default async function TutoringCalculatorPage() {
  return (
    <>
      <Hero heading="Tutoring Calculator" />
      <Body containerSize="small" background="cream" spacing="small">
        <TutoringCalculator />
      </Body>
    </>
  );
}
