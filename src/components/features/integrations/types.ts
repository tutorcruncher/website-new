import { ReactElement } from "react";

import { Image } from "../../../types/image";

export interface Integration {
  logo: Image;
  title: string;
  intro: string;
  category: string;
  content: ReactElement;
  screenshot?: Image;
}

export interface IntegrationsProps {
  integrations: Integration[];
}
