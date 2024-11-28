"use client";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import styles from "./accordion.module.scss";

interface AccordionProps {
  title: string;
  children: ReactNode;
}

export const Accordion = ({ title, children }: AccordionProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className={clsx(styles.accordion, isOpen && styles.open)}>
      <div className={styles.summary} onClick={() => setIsOpen(!isOpen)}>
        <p className={styles.heading}>{title}</p>
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
      <div className={styles.content}>{children}</div>
    </div>
  );
};
