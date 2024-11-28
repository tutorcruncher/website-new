import { notFound } from "next/navigation";
import { Metadata } from "next/types";

import { formatMetaData } from "@/helpers/metaData";
import { ArticleLayout } from "@/layouts/article";
import { createClient } from "@/lib/prismic/prismicio";

export async function generateMetadata({ params }): Promise<Metadata> {
  const client = createClient();
  const { data } = await client.getByUID("article", params.uid);

  const url = `https://tutorcruncher.com/${params.slug}`;

  return formatMetaData(data.title, data.meta_description, url);
}

export async function generateStaticParams() {
  const client = createClient();

  const articles = await client.getAllByType("article");

  return articles.map((article) => ({
    uid: article.uid,
  }));
}

const StaticBlogPage = async ({ params }) => {
  const client = createClient();
  const article = await client.getByUID("article", params.uid, {
    fetchLinks: "category.title",
  });

  try {
    return <ArticleLayout content={article} />;
  } catch (error) {
    console.error("Error fetching content:", error);
    return notFound();
  }
};

export default StaticBlogPage;
