import clsx from "clsx";
import Image from "next/image";

import { Action } from "@/components/ui/action";
import { Heading } from "@/components/ui/heading";

import { AlternatingGridItem } from "../types";
import styles from "./alternating-grid-item.module.scss";

export const TextImageGridItem = ({
  heading,
  content,
  button,
  image,
  className,
  variation = "default",
}: AlternatingGridItem) => {
  return (
    <div
      className={clsx(
        "animate",
        styles.alternatingGridItem,
        styles[`variant--${variation}`],
        image && image.position === "Left" && styles.imageOnLeft,
        className,
      )}
    >
      {image ? (
        <div className={styles.imageWrapper}>
          <Image
            src={image.url}
            alt={image.alt || " "}
            width={image.width}
            height={image.height}
          />
        </div>
      ) : null}
      <div className={styles.contentWrapper}>
        {heading ? (
          <Heading
            variant="h2"
            noMargin
            size={variation === "withBackground" ? "large" : "medium"}
            className={styles.header}
          >
            {heading}
          </Heading>
        ) : null}
        <div className={styles.content}>{content}</div>
        {button ? (
          <div className={styles.actionWrapper}>
            <Action href={button.link}>{button.text}</Action>
          </div>
        ) : null}
      </div>
    </div>
  );
};
