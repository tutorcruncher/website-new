import clsx from "clsx";
import type { JSX } from "react";
import React from "react";

import styles from "./heading.module.scss";
import { HeadingProps } from "./types";

export const Heading: React.FC<HeadingProps> = ({
  children,
  variant = "h1",
  size = "medium",
  className,
  center,
  noMargin,
}) => {
  const HeadingTag = variant as keyof JSX.IntrinsicElements;

  return (
    <HeadingTag
      className={clsx(
        styles.heading,
        styles[`heading--${size}`],
        noMargin && styles.noMargin,
        center && styles.center,
        className,
      )}
    >
      {children}
    </HeadingTag>
  );
};
