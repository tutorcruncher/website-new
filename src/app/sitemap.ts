import { createClient } from "@/lib/prismic/prismicio";

export default async function sitemap() {
  const client = createClient();
  const pages = await client.getAllByType("page");
  const articles = await client.getAllByType("article");
  const solutions = await client.getAllByType("solutions");

  const BASE_URL = "https://tutorcruncher.com";

  const formatedPages = pages.map((doc) => ({
    ...doc,
    url: doc.uid,
  }));

  const formatedArticles = articles.map((doc) => ({
    ...doc,
    url: `blog/${doc.uid}`,
  }));

  const formatedSolutions = solutions.map((doc) => ({
    ...doc,
    url: `solutions/${doc.uid}`,
  }));

  const allDynamicEntries = [
    ...formatedPages,
    ...formatedArticles,
    ...formatedSolutions,
  ];

  const dynamicEntries = allDynamicEntries.map((doc) => ({
    url: `${BASE_URL}/${doc.url}`,
    lastModified: new Date(doc.last_publication_date).toISOString(),
  }));

  // TODO: Update static entries when all pages are present.
  const staticEntries = [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
    },
  ];

  return [...staticEntries, ...dynamicEntries];
}
