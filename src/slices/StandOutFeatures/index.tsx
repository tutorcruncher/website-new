import { PrismicRichText } from "@prismicio/react";

import { StandoutFeatures as StandOutFeaturesComponent } from "@/components/features/standout-features";
import { prismicToNextImage } from "@/helpers/prismicToNextImage";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `StandOutFeatures`.
 */
export type StandOutFeaturesProps =
  SliceComponentProps<Content.StandOutFeaturesSlice>;

/**
 * Component for "StandOutFeatures" Slices.
 */
const StandOutFeatures = ({ slice }: StandOutFeaturesProps): JSX.Element => {
  const formatedFeatures = slice.primary.features.map((feature) => ({
    title: feature.title,
    icon: prismicToNextImage(feature.icon),
    intro: feature.intro,
    content: <PrismicRichText field={feature.content} />,
  }));

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <StandOutFeaturesComponent
        title={slice.primary.title}
        features={formatedFeatures}
      />
    </section>
  );
};

export default StandOutFeatures;
