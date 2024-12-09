import { ChevronDown } from "@/svgs/chevron-down";
import clsx from "clsx";
import styles from "./arrow-link.module.scss";
import { ArrowLinkProps } from "./type";
import { Action } from "../action";

export const ArrowLink = ({
  text,
  href,
  direction = "forward",
}: ArrowLinkProps) => (
  <div className={clsx(styles.arrowLink, styles[direction])}>
    <Action href={href} variant="outline">
      <span>{text}</span>
      <ChevronDown />
    </Action>
  </div>
);
