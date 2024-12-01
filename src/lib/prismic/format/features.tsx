import { PrismicRichText } from "@prismicio/react";

import { prismicToNextImage } from "@/helpers/prismicToNextImage";

import {
  FeatureDocument,
  FeatureDocumentData,
  IntegrationDocument,
  IntegrationsDocumentData,
  Simplify,
} from "../../../../prismicio-types";

export const formatFeaturesLandingPage = (
  data: Simplify<IntegrationsDocumentData>,
  allFeatures: Simplify<FeatureDocument>[]
) => {
  const heading = <PrismicRichText field={data.heading} />;

  const meta = {
    title: data.meta_title,
    description: data.meta_description,
  };

  const features = allFeatures.map((feature) => ({
    title: feature.data.heading,
    listImage: prismicToNextImage(feature.data.list_image),
    listText: feature.data.list_text,
    url: `/features/${feature.uid}`,
  }));

  return { heading, meta, features };
};
