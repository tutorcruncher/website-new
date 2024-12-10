import { ReactElement } from "react";

import { ImageField } from "@prismicio/client";

export interface Integration {
  logo: ImageField;
  title: string;
  intro: string;
  category: string;
  content: ReactElement;
  screenshot?: ImageField;
}

export interface IntegrationsProps {
  integrations: Integration[];
}
