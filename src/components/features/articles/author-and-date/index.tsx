import Image from "next/image";

import { IAuthor } from "../types";
import styles from "./shareLinks.module.scss";

export const AuthorAndDate = ({ authorImage, authorName, date }: IAuthor) => {
  return (
    <div className={styles.authorWrapper}>
      {authorImage ? (
        <div className={styles.imageWrapper}>
          <Image
            src={authorImage.url}
            alt={authorImage.alt || " "}
            width={authorImage.width}
            height={authorImage.height}
          />
        </div>
      ) : null}
      <div>
        {authorName ? (
          <span className={styles.authorName}>By {authorName}</span>
        ) : null}
        {authorName && date ? " | " : null}
        {new Date(date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </div>
    </div>
  );
};
