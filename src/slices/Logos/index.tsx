import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import type { JSX } from "react";

import { Logos as LogoComponent } from "@/components/features/logos";

/**
 * Props for `Logos`.
 */
export type LogosProps = SliceComponentProps<Content.LogosSlice>;

/**
 * Component for "Logos" Slices.
 */
const Logos = ({ slice }: LogosProps): JSX.Element => {
  const { heading, logo } = slice.primary;

  const formattedHeading = <PrismicRichText field={heading} />;
  const formattedImages = logo.map(({ image }) => image);
  return <LogoComponent heading={formattedHeading} logos={formattedImages} />;
};

export default Logos;
