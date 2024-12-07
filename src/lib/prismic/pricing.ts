import { createClient } from "@/lib/prismic/prismicio";

import { formatPricingPage } from "./format/pricing";

export const fetchPricingPageByUid = async (uid: string) => {
  const client = createClient();
  try {
    const { data } = await client.getByUID("pricing", uid);
    const allOptionalExtras = await client.getAllByType("optional_extra");
    return formatPricingPage(data, allOptionalExtras);
  } catch (error) {
    console.error("Error fetching integrations:", error);
  }
};
