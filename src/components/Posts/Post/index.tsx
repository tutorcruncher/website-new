import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";

import { Heading } from "@/components/ui/heading";
import { Tag } from "@/components/ui/tag";

import { ArticleDocument } from "../../../../prismicio-types";
import styles from "./post.module.scss";

const TrimmedRichText = ({ content }) => {
  const firstParagraph = content.find((block) => block.type === "paragraph");

  if (!firstParagraph) return null;

  const textContent = firstParagraph.text;

  const wordsArray = textContent.split(" ");
  const trimmedText = wordsArray.slice(0, 20).join(" ") + "...";

  return <p>{trimmedText}</p>;
};

export const Post = ({ post }: { post: ArticleDocument }) => {
  const { data } = post;
  // @ts-expect-error
  const category = data.category?.data?.title;
  return (
    <Link
      href={`/blog/${post.uid}`}
      key={post.id}
      className={styles.postListItem}
    >
      <div className={styles.imageWrapper}>
        <PrismicNextImage field={data.featured_image} />
      </div>
      <div className={styles.inner}>
        <div className={styles.tags}>
          <Tag
            key={`${post.id} - ${category}`}
            title={category}
            noHoverEffect
          />
        </div>
        <Heading size="xxsmall" className={styles.title} variant="h2" noMargin>
          {data.title}
        </Heading>
        <TrimmedRichText content={data.content} />
        <p className={styles.date}>
          {new Date(data.publishDate)
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "2-digit",
            })
            .replace(/ /g, " ")}
        </p>
      </div>
    </Link>
  );
};
