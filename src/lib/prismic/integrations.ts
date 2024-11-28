import { createClient } from "@/lib/prismic/prismicio";

import { formatIntegrationsPage } from "./format/integrations";

export const fetchIntegrationsPage = async () => {
  const client = createClient();
  try {
    const { data } = await client.getSingle("integrations");
    const allIntegrations = await client.getAllByType("integration");
    return formatIntegrationsPage(data, allIntegrations);
  } catch (error) {
    console.error("Error fetching integrations:", error);
  }
};
