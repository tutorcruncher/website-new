import * as prismic from "@prismicio/client";

import { notFound } from "next/navigation";
import { Metadata } from "next/types";

import { formatMetaData } from "@/helpers/metaData";
import { createClient } from "prismicio";
import { fetchArticleByUid, fetchArticles } from "@/lib/prismic/articles";
import { generateArticleSchema } from "@/schema/blog_post";
import { ArticleDetail } from "@/components/features/articles/article-detail";

export async function generateMetadata({ params }): Promise<Metadata> {
  const client = createClient();

  try {
    const { data } = await client.getByUID("article", params.uid);
    const url = `https://tutorcruncher.com/blog/${params.uid}`;
    return formatMetaData(
      data.title,
      data.meta_description,
      url,
      data.no_index
    );
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const client = createClient();

  const articles = await client.getAllByType("article");

  return articles.map((article) => ({
    uid: article.uid,
  }));
}

const StaticBlogPage = async ({ params }) => {
  try {
    const article = await fetchArticleByUid(params.uid);
    const relatedPosts = await fetchArticles(
      [prismic.filter.at("my.article.category", article.content.category.id)],
      3
    );
    const schemaData = generateArticleSchema(article);
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaData }}
        />
        <ArticleDetail article={article} relatedPosts={relatedPosts} />
      </>
    );
  } catch {
    return notFound();
  }
};

export default StaticBlogPage;
