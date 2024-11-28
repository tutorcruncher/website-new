import clsx from "clsx";
import Link from "next/link";
import type { ReactElement } from "react";

import styles from "./icon-button-link.module.scss";

export interface IconButtonProps {
  href: string;
  children: ReactElement;
  variant?: "white" | "lightBlue";
  target?: string;
  ariaLabel: string;
}

export const IconButtonLink = ({
  children,
  href,
  variant = "lightBlue",
  ariaLabel,
}: IconButtonProps) => {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={clsx(styles.button, variant && styles[variant])}
      target="_blank"
    >
      {children}
    </Link>
  );
};
