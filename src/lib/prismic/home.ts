import { createClient } from "@/lib/prismic/prismicio";

import { formatHomePage } from "./format/home";
import { fetchSchema } from "./helpers";

export const fetchHomePage = async () => {
  const client = createClient();
  try {
    const { data } = await client.getSingle("home_page");
    //@ts-expect-error - TODO
    const schema = await fetchSchema(data.schema);
    return formatHomePage(data, schema);
  } catch (error) {
    console.error("Error fetching integrations:", error);
  }
};
