import { createClient } from "@/lib/prismic/prismicio";

import { formatContactPage } from "./format/contact";
import { fetchSchemas } from "@/lib/prismic/helpers";
export const fetchContactPage = async () => {
  const client = createClient();
  try {
    const { data } = await client.getSingle("contact");
    const schemas = await fetchSchemas(data.schemas);
    return formatContactPage(data, schemas);
  } catch (error) {
    console.error("Error fetching integrations:", error);
  }
};
