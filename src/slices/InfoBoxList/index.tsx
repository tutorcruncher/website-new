import { PrismicRichText } from "@prismicio/react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { InfoBoxList as InfoBoxListComponent } from "@/components/features/info-box-list";
import { backgroundColor } from "@/helpers/backgroundColor";
/**
 * Props for `InfoBoxList`.
 */
export type InfoBoxListProps = SliceComponentProps<Content.InfoBoxListSlice>;

/**
 * Component for "InfoBoxList" Slices.
 */
const InfoBoxList = ({ slice }: InfoBoxListProps): JSX.Element => {
  const background = backgroundColor(slice.primary.background_colour);
  const formatedFeatures = slice.primary.features.map((feature) => ({
    title: feature.title,
    icon: feature.icon,
    intro: feature.intro,
    content: <PrismicRichText field={feature.content} />,
  }));

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <InfoBoxListComponent
        title={slice.primary.title}
        features={formatedFeatures}
        background={background}
      />
    </section>
  );
};

export default InfoBoxList;
