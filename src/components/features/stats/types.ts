import { ReactNode } from "react";

import { ImageField } from "@prismicio/types";

interface Stat {
  image: ImageField;
  percent: string;
  description: string;
}

export interface StatsProps {
  heading: ReactNode;
  background?: "blue" | "cream";
  stats: Stat[];
}
