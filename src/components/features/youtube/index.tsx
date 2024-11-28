import { Body } from "@/components/ui/body";

import { YouTubePlayer } from "./player";

export const Youtube = ({ videoId }: { videoId: string }) => (
  <Body containerSize="small">
    <YouTubePlayer videoId={videoId} />
  </Body>
);
