import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import type { JSX } from "react";

import { SolutionHero } from "@/components/features/hero/solution-hero";
import { Hero as HeroComponent } from "@/components/ui/hero";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const { heading, intro } = slice.primary;

  if (!Array.isArray(heading)) return;

  const headingText = <PrismicRichText field={heading} />;

  if (slice.variation === "solutionHero") {
    return (
      <SolutionHero
        heading={headingText}
        intro={intro}
        pricingTier={slice.primary.pricing_tier}
      />
    );
  }

  return <HeroComponent heading={headingText} intro={intro} headingVariant="div" />
};

export default Hero;
