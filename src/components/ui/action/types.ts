import { ReactNode } from "react";

export type ActionVariants = "solid" | "outline" | "white";

export interface ActionProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "solid" | "outline" | "white";
  size?: "small" | "base";
  disabled?: boolean;
  disableAnimation?: boolean;
  type?: "button" | "submit";
  fullwidth?: boolean;
  loading?: boolean;
}
