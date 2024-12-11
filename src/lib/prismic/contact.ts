import { createClient } from "@/lib/prismic/prismicio";

import { formatContactPage } from "./format/contact";
import { fetchSchema } from "@/lib/prismic/helpers";
export const fetchContactPage = async () => {
  const client = createClient();
  try {
    const { data } = await client.getSingle("contact");
    //@ts-expect-error - TODO
    const schema = await fetchSchema(data.schema);
    return formatContactPage(data, schema);
  } catch (error) {
    console.error("Error fetching integrations:", error);
  }
};
