import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import type { JSX } from "react";

import { Body } from "@/components/ui/body";

/**
 * Props for `BodyText`.
 */
export type BodyTextProps = SliceComponentProps<Content.BodyTextSlice>;

/**
 * Component for "BodyText" Slices.
 */
const BodyText = ({ slice }: BodyTextProps): JSX.Element => {
  const backgroundColour =
    (slice.primary.background_colour?.toLowerCase() as
      | "white"
      | "blue"
      | "cream") || "white";
  return (
    <Body containerSize="small" spacing="small" background={backgroundColour}>
      <div className="main-content">
        <PrismicRichText field={slice.primary.content} />
      </div>
    </Body>
  );
};

export default BodyText;
