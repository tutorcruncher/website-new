import { createClient } from "prismicio";

import { formatIntegrationsPage } from "./format/integrations";
import { fetchSchemas } from "./helpers";

export const fetchIntegrationsPage = async () => {
  const client = createClient();
  try {
    const { data } = await client.getSingle("integrations");
    const allIntegrations = await client.getAllByType("integration");
    const schemas = await fetchSchemas(data.schemas);
    return formatIntegrationsPage(data, allIntegrations, schemas);
  } catch (error) {
    console.error("Error fetching integrations:", error);
  }
};
