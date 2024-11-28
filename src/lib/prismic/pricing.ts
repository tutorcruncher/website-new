import { createClient } from "@/lib/prismic/prismicio";

import { formatPricingPage } from "./format/pricing";

export const fetchPricingPageByUid = async (uid: string) => {
  const client = createClient();
  try {
    const { data } = await client.getByUID("pricing", uid);
    return formatPricingPage(data);
  } catch (error) {
    console.error("Error fetching integrations:", error);
  }
};
