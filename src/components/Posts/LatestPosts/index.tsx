import { Action } from "@/components/ui/action";
import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";

import { Posts } from "..";
import styles from "./latestPosts.module.scss";

interface LatestPostsProps {
  posts: any[];
  title: string;
  showAllBtn?: boolean;
  background?: "blue" | "cream";
}

export const LatestPosts = ({
  posts,
  title,
  showAllBtn = false,
  background = "blue",
}: LatestPostsProps) => {
  if (posts.length === 0) return null;

  const showAsCarousel = posts.length > 1;
  return (
    <Body
      background={background}
      heading={
        <Heading center variant="h2">
          {title}
        </Heading>
      }
    >
      <Posts posts={posts} carousel={showAsCarousel} animate />
      {showAllBtn ? (
        <div className={styles.linkWapper}>
          <Action href="/blog" variant="outline">
            View all
          </Action>
        </div>
      ) : null}
    </Body>
  );
};
