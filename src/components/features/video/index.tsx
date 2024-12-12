import { Body } from "@/components/ui/body";
import { VideoPlayer } from "./player";

export const VideoPlayerContainer = ({ videoUrl, placeholderImage }) => (
  <Body containerSize="small">
    <VideoPlayer videoUrl={videoUrl} placeholderImage={placeholderImage} />
  </Body>
);
