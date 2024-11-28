import { createClient } from "@/lib/prismic/prismicio";

import { formatHomePage } from "./format/home";

export const fetchHomePage = async () => {
  const client = createClient();
  try {
    const { data } = await client.getSingle("home_page");
    return formatHomePage(data);
  } catch (error) {
    console.error("Error fetching integrations:", error);
  }
};
