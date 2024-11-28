import { createClient } from "@/lib/prismic/prismicio";

import { formatContactPage } from "./format/contact";

export const fetchContactPage = async () => {
  const client = createClient();
  try {
    const { data } = await client.getSingle("contact");
    return formatContactPage(data);
  } catch (error) {
    console.error("Error fetching integrations:", error);
  }
};
