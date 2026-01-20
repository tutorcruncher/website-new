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
const BodyText = ({ slice, index, context }: BodyTextProps): JSX.Element => {
  const backgroundColour =
    (slice.primary.background_colour?.toLowerCase() as
      | "white"
      | "blue"
      | "cream") || "white";
  
  // Only apply no-padding logic to privacy page
  const isPrivacyPage = (context as any)?.isPrivacyPage === true;
  const spacing = isPrivacyPage && index > 0 ? "none" : "small";
  
  return (
    <Body containerSize="small" spacing={spacing} background={backgroundColour}>
      <div className="main-content">
        <PrismicRichText field={slice.primary.content} />
      </div>
    </Body>
  );
};

export default BodyText;
