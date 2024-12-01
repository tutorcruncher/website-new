import Image from "next/image";

import { IAuthor } from "../types";
import styles from "./shareLinks.module.scss";

export const AuthorAndDate = ({ authorImage, authorName, date }: IAuthor) => {
  return (
    <div className={styles.authorWrapper}>
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
