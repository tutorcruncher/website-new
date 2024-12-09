import { createClient } from "@/lib/prismic/prismicio";

export const fetchAllPages = async () => {
  const client = createClient();
  try {
    const pages = await client.getAllByType("page");
    return pages;
  } catch {
    return [];
  }
};

export const fetchPageByUid = async (uid: string) => {
  const client = createClient();
  try {
    return await client.getByUID("page", uid);
  } catch (error) {
    console.error("Error fetching page:", error);
  }
};
