import { ChevronDown } from "@/svgs/chevron-down";
import Link from "next/link";
import clsx from "clsx";
import styles from "./arrow-link.module.scss";
import { ArrowLinkProps } from "./type";

export const ArrowLink = ({
  text,
  href,
  direction = "forward",
}: ArrowLinkProps) => (
  <div className={clsx(styles.arrowLink, styles[direction])}>
    <Link href={href}>
      <span>{text}</span>
      <ChevronDown />
    </Link>
  </div>
);
