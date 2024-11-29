import type { ReactHTMLElement } from "react";

export type ActionVariants = "solid" | "outline" | "white";

export interface ActionProps {
  href?: string;
  onClick?: () => void;
  children: string | ReactHTMLElement<any>;
  variant?: "solid" | "outline" | "white";
  size?: "small" | "base";
  disabled?: boolean;
  disableAnimation?: boolean;
  type?: "button" | "submit";
  fullwidth?: boolean;
}
