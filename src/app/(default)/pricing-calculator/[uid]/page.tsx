import { regions } from "app/data/regions/regions";

import { PriceCalculator } from "@/components/features/pricing/pricing-calculator";
import { PriceCalculatorGB } from "@/components/features/pricing/pricing-calculator/gb";
import { Body } from "@/components/ui/body";
import { Hero } from "@/components/ui/hero";
import { CallToAction } from "@/components/features/call-to-action";

const PricingPage = ({ params }) => {
  const region = regions.find((region) => region.region_code === params.uid);
  return (
    <>
      <Hero heading="Pricing Calculator" />
      <Body containerSize="medium" spacing="small" background="cream">
        {region.region_code === "gb" ? (
          <PriceCalculatorGB region={region} />
        ) : (
          <PriceCalculator region={region} />
        )}
      </Body>
      <CallToAction background="blue" />
    </>
  );
};

export default PricingPage;
