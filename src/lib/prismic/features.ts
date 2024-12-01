import { createClient } from "@/lib/prismic/prismicio";

import { formatIntegrationsPage } from "./format/integrations";
import { formatFeaturesLandingPage } from "./format/features";

export const fetchFeaturesLandingPage = async () => {
  const client = createClient();
  try {
    const { data } = await client.getSingle("features");
    const allFeatures = await client.getAllByType("feature");
    return formatFeaturesLandingPage(data, allFeatures);
  } catch (error) {
    console.error("Error fetching integrations:", error);
  }
};
