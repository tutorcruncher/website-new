import { PriceCalculator } from "@/components/features/pricing/pricing-calculator";
import { PriceCalculatorGB } from "@/components/features/pricing/pricing-calculator/gb";
import { Body } from "@/components/ui/body";
import { Hero } from "@/components/ui/hero";
import { CallToAction } from "@/components/features/call-to-action";
import { fetchPricingPageByUid } from "@/lib/prismic/pricing";
import { Metadata } from "next/types";
import { formatMetaData } from "@/helpers/metaData";

export async function generateMetadata({ params }): Promise<Metadata> {
  try {
    const { meta } = await fetchPricingPageByUid(params.uid);
    const url = `https://tutorcruncher.com/pricing-calculator/${params.uid}`;

    const title = `Pricing Calculator ${params.uid.toUpperCase()} | TutorCruncher`;
    return formatMetaData(title, meta.description, url);
  } catch {
    return null;
  }
}

const PricingPage = async ({ params }) => {
  const { pricing } = await fetchPricingPageByUid(
    params.uid
  );
  const region = params.uid;
  return (
    <>
      <Hero heading="Pricing Calculator" />
      <Body containerSize="medium" spacing="small" background="cream">
        {region === "gb" ? (
          <PriceCalculatorGB region={region} pricing={pricing} />
        ) : (
          <PriceCalculator region={region} pricing={pricing} />
        )}
      </Body>
      <CallToAction background="blue" />
    </>
  );
};

export default PricingPage;
