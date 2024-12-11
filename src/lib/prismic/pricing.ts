import { createClient } from "@/lib/prismic/prismicio";

import { formatPricingPage } from "./format/pricing";
import { fetchSchema } from "./helpers";

export const fetchPricingPageByUid = async (uid: string) => {
  const client = createClient();
  try {
    const { data } = await client.getByUID("pricing", uid, {
      fetchLinks:
        "optional_extra.title,optional_extra.content,optional_extra.category,optional_extra.image",
    });
    // @ts-expect-error - TODO
    const schema = await fetchSchema(data.schema);
    return formatPricingPage(data, schema);
  } catch (error) {
    console.error("Error fetching integrations:", error);
  }
};
