import { createClient } from "@/lib/prismic/prismicio";

import { ArticleDocument, CategoryDocument } from "../../../prismicio-types";

type ArticleWithCategory = ArticleDocument & { category: CategoryDocument };

export const fetchArticles = async (
  filters = [],
  limit = 1000
): Promise<ArticleWithCategory[]> => {
  const client = createClient();
  try {
    return await client.getAllByType("article", {
      filters,
      limit,
      orderings: {
        field: "my.article.publishDate",
        direction: "desc",
      },
      fetchLinks: "category.title",
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

export const fetchArticleByUid = async (uid: string) => {
  const client = createClient();
  try {
    return await client.getByUID("article", uid, {
      fetchLinks: "category.title",
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};
