"use client";
import clsx from "clsx";
import AnimateHeight from "react-animate-height";

import { Heading } from "@/components/ui/heading";

import { IAccordion } from "../types";
import styles from "./accordion.module.scss";
import { PrismicNextImage } from "@prismicio/next";

export const Accordion = ({
  heading,
  content,
  image,
  isExpanded = false,
  onClick,
}: IAccordion) => {
  return (
    <div className={clsx(styles.accordion, isExpanded && styles.open)}>
      <div className={styles.contentWrapper}>
        <div className={styles.header} onClick={() => onClick()}>
          <Heading size="xsmall" variant="h3" noMargin>
            {heading}
          </Heading>
          <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="8.3335" width="18" height="2.66667" fill="#362E83" />
            <rect y="8.3335" width="18" height="2.66667" fill="#362E83" />
          </svg>
        </div>
        <AnimateHeight
          duration={300}
          height={isExpanded ? "auto" : 0}
          disableDisplayNone
          className={styles.t}
        >
          <div className={styles.content}>{content}</div>
        </AnimateHeight>
      </div>
      {image ? (
        <div className={styles.imageWrapper}>
          <PrismicNextImage field={image} fallbackAlt="" />
        </div>
      ) : null}
    </div>
  );
};
