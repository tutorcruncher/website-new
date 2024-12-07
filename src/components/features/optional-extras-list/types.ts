import { ReactElement } from "react";

import { Image } from "../../../types/image";

export interface OptionalExtra {
  logo: Image;
  title: string;
  intro: string;
  category: string;
  content: ReactElement;
  screenshot?: Image;
}
