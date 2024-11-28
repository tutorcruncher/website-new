import { PrismicRichText } from "@prismicio/react";

import { prismicToNextImage } from "@/helpers/prismicToNextImage";

import {
  IntegrationDocument,
  IntegrationsDocumentData,
  Simplify,
} from "../../../../prismicio-types";

export const formatIntegrationsPage = (
  data: Simplify<IntegrationsDocumentData>,
  allIntegrations: Simplify<IntegrationDocument>[],
) => {
  const heading = <PrismicRichText field={data.heading} />;

  const meta = {
    title: data.meta_title,
    description: data.meta_description,
  };

  const integrations = allIntegrations.map(({ data }) => ({
    title: data.title,
    logo: prismicToNextImage(data.logo),
    category: data.category,
    intro: data.intro,
    content: <PrismicRichText field={data.description} />,
  }));

  return { heading, meta, integrations };
};
