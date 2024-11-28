"use client";
import clsx from "clsx";
import { useState } from "react";
import AnimateHeight from "react-animate-height";

import { Heading } from "@/components/ui/heading";

import { IFaq } from "../types";
import styles from "./faq.module.scss";

export const Faq = ({ question, answer }: IFaq) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className={clsx(styles.faq, isExpanded && styles.open)}>
      <div onClick={() => setIsExpanded(!isExpanded)} className={styles.header}>
        <Heading size="xsmall" variant="h3" noMargin>
          {question}
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
      >
        <div className={styles.answer}>{answer}</div>
      </AnimateHeight>
    </div>
  );
};
