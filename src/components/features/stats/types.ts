import { ReactNode } from "react";

import { Image } from "@/types/image";

interface Stat {
  image: Image;
  percent: string;
  description: string;
}

export interface StatsProps {
  heading: ReactNode;
  background?: "blue" | "cream";
  stats: Stat[];
}
