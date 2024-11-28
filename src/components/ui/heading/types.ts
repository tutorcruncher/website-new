import { ReactNode } from "react";

type HeadingSize =
  | "xxsmall"
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge";

type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "div";

export interface HeadingProps {
  children: ReactNode;
  variant?: Variant;
  size?: HeadingSize;
  className?: string;
  center?: boolean;
  noMargin?: boolean;
}
