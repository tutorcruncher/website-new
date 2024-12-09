import { createClient } from "@/lib/prismic/prismicio";
import { formatFeaturesLandingPage } from "./format/features";
import { fetchSchema } from "./helpers";

export const fetchFeaturesLandingPage = async () => {
  const client = createClient();
  try {
    const { data } = await client.getSingle("features");
    const allFeatures = await client.getAllByType("feature");
    // @ts-expect-error - TODO
    const schema = await fetchSchema(data.schema);
    console.log("schema", schema);
    return formatFeaturesLandingPage(data, allFeatures, schema);
  } catch (error) {
    console.error("Error fetching integrations:", error);
  }
};
