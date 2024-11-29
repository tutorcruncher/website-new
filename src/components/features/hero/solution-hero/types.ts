import { ReactNode } from "react";

export interface HeroProps {
  heading: ReactNode;
  intro?: string;
  pricingTier?: string;
}
