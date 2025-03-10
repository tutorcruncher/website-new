import { PrismicRichText } from "@prismicio/react";

import {
  Simplify,
  TutoringCalculatorDocumentData,
} from "../../../../prismicio-types";

export const formatTutoringCalculatorPage = (
  data: Simplify<TutoringCalculatorDocumentData>,
  schemas
) => {
  const heading = <PrismicRichText field={data.heading} />;
  const intro = <PrismicRichText field={data.intro} />;
  const content = <PrismicRichText field={data.content} />;

  const meta = {
    title: data.meta_title || "",
    description: data.meta_description || "",
  };

  return { heading, meta, intro, schemas, content };
};
