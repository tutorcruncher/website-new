import clsx from "clsx";
import Link from "next/link";

import styles from "./action.module.scss";
import { ActionProps } from "./types";

export const Action = ({
  href,
  onClick,
  children,
  variant = "solid",
  size,
  disabled,
  disableAnimation,
  type = "button",
  fullwidth = false,
}: ActionProps) => {
  const className = clsx(
    styles.action,
    disableAnimation && styles.disableAnimation,
    variant && styles[variant],
    size && styles[size],
    disabled && styles.disabled,
    fullwidth && styles.fullwidth,
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={type === "button" ? onClick : undefined}
      className={className}
    >
      {children}
    </button>
  );
};
