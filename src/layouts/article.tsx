import * as prismic from "@prismicio/client";

import { ArticleDetail } from "@/components/features/articles/article-detail";
import { fetchArticles } from "@/lib/prismic/articles";

export const ArticleLayout = async ({ content }) => {
  const categoryId = content.data.category.id;
  const relatedPosts = await fetchArticles(
    [prismic.filter.at("my.article.category", categoryId)],
    3,
  );

  return <ArticleDetail post={content} relatedPosts={relatedPosts} />;
};
