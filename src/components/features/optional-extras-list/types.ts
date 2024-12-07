import { ReactElement } from "react";

import { Image } from "../../../types/image";

export interface OptionalExtra {
  image: Image;
  title: string;
  category: string;
  content: ReactElement;
}
