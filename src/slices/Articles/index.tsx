import * as prismic from "@prismicio/client";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import type { JSX } from "react";

import { LatestPosts } from "@/components/Posts/LatestPosts";
import { createClient } from "@/lib/prismic/prismicio";
import { ArticleDocument } from "../../../prismicio-types";

export type ArticlesProps = SliceComponentProps<Content.ArticlesSlice>;

const queryOptions = {
  orderings: {
    field: "my.article.publishDate",
    direction: "desc" as const,
  },
  page: 1,
  pageSize: 3,
  fetchLinks: "category.title",
};

const Articles = async ({
  slice,
}: ArticlesProps): Promise<JSX.Element | null> => {
  const client = createClient();
  const { variation, primary } = slice;

  if (variation === "articlesByCategory") {
    const { results } = await client.getByType("article", {
      // @ts-ignore
      // https://community.prismic.io/t/content-relationship-types-within-another-content-relationship-in-a-slice/13866/3
      filters: [prismic.filter.at("my.article.category", primary.category.id)],
      ...queryOptions,
    });

    return (
      <LatestPosts
        title={primary.heading}
        posts={results}
        showAllBtn={primary.show_all_button}
      />
    );
  }

  // Fetch articles by IDs or fallback to latest articles
  const articleIds = primary.articles?.map((item) => item.article.id) || [];
  const { results: posts } = articleIds.length
    ? await client.getByIDs(articleIds, queryOptions)
    : await client.getByType("article", queryOptions);

  return (
    <LatestPosts
      title={primary.heading}
      posts={posts as ArticleDocument<string>[]}
      showAllBtn={primary.show_all_button}
    />
  );
};

export default Articles;
