import { ReactNode } from "react";

import type { Image } from "@/types/image";

export interface TeamMemberProps {
  image: Image;
  name: string;
  role: string;
  intro: ReactNode;
}
