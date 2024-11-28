import clsx from "clsx";

import styles from "./tag.module.scss";

interface TagProps {
  title: string;
  active?: boolean;
  noHoverEffect?: boolean;
}

export const Tag = ({
  title,
  active = false,
  noHoverEffect = false,
}: TagProps) => {
  return (
    <span
      className={clsx(
        styles.tag,
        { [styles.active]: active },
        { [styles.noHoverEffect]: noHoverEffect },
      )}
    >
      {title}
    </span>
  );
};
