import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";

import { VideoPlayerContainer } from "@/components/features/video";
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
      <VideoPlayerContainer
        videoUrl={slice.primary.video_url}
        placeholderImage={slice.primary.placeholder_image}
      />
    </section>
  );
};

export default Youtube;
