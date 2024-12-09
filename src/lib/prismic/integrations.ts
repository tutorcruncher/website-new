import { createClient } from "@/lib/prismic/prismicio";

import { formatIntegrationsPage } from "./format/integrations";
import { fetchSchema } from "./helpers";

export const fetchIntegrationsPage = async () => {
  const client = createClient();
  try {
    const { data } = await client.getSingle("integrations");
    const allIntegrations = await client.getAllByType("integration");
    //@ts-expect-error - TODO
    const schema = await fetchSchema(data.schema);
    return formatIntegrationsPage(data, allIntegrations, schema);
  } catch (error) {
    console.error("Error fetching integrations:", error);
  }
};
