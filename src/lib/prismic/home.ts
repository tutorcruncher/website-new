import { createClient } from "prismicio";

import { formatHomePage } from "./format/home";
import { fetchSchemas } from "./helpers";

export const fetchHomePage = async () => {
  const client = createClient();
  try {
    const { data } = await client.getSingle("home_page");
    const schemas = await fetchSchemas(data.schemas);
    return formatHomePage(data, schemas);
  } catch (error) {
    console.error("Error fetching integrations:", error);
  }
};
