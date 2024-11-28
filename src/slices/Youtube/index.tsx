import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";

import { Youtube as YoutubeComponent } from "@/components/features/youtube";
/**
 * Props for `Youtube`.
 */
export type YoutubeProps = SliceComponentProps<Content.YoutubeSlice>;

/**
 * Component for "Youtube" Slices.
 */
const Youtube = ({ slice }: YoutubeProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <YoutubeComponent videoId={slice.primary.youtube_id} />
    </section>
  );
};

export default Youtube;
