import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import type { JSX } from "react";

import { AccordionsList } from "@/components/features/accordions/accordions-list";

/**
 * Props for `Accordions`.
 */
export type AccordionsProps = SliceComponentProps<Content.AccordionsSlice>;

/**
 * Component for "Accordions" Slices.
 */
const Accordions = ({ slice }: AccordionsProps): JSX.Element => {
  const formattedItems = slice.primary.content.map((item) => {
    return {
      ...item,
      content: <PrismicRichText field={item.content} />,
    };
  });

  return (
    <AccordionsList
      heading={<PrismicRichText field={slice.primary.heading} />}
      backgroundColour={
        slice.primary.background_colour.toLowerCase() as "cream" | "blue"
      }
      items={formattedItems}
    />
  );
};

export default Accordions;
