import * as prismic from "@prismicio/client";

import { notFound, redirect } from "next/navigation";
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
  const article = await fetchArticleByUid(params.uid);

  if (!article) return notFound();

  // Prismic UID field stores all previous values and allows you to query the document with these.
  // We want to ensure only the latest value for the UID is used to prevent duplicate pages being indexed.
  if (!article.content.url.includes(params.uid)) {
    redirect(article.content.url);
  }

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
};

export default StaticBlogPage;
