import { ReactElement } from "react";

import { ImageField } from "@prismicio/types";

export interface OptionalExtra {
  image: ImageField;
  title: string;
  category: string;
  content: ReactElement;
}
