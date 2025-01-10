import clsx from "clsx";

import { ArticleDocument } from "../../../../../prismicio-types";
import { Post } from "../post";
import styles from "./posts.module.scss";

export const Posts = ({
  posts,
  carousel = false,
  animate = false,
}: {
  posts: ArticleDocument[];
  carousel?: boolean;
  animate?: boolean;
}) => {
  return (
    <div
      className={clsx(styles.posts, [
        carousel && styles.carousel,
        animate && "animate-children",
      ])}
    >
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};
