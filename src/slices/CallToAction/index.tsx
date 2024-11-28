import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import type { JSX } from "react";

import { CallToAction as CallToActionComponent } from "@/components/features/call-to-action";

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction = ({ slice }: CallToActionProps): JSX.Element => {
  const background = slice.primary.background_colour
    ? (slice.primary.background_colour.toLocaleLowerCase() as "cream" | "blue")
    : null;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <CallToActionComponent background={background} />
    </section>
  );
};

export default CallToAction;
