import * as prismic from "@prismicio/client";

import ArticlesLayout from "@/layouts/articles";
import { fetchArticles } from "@/lib/prismic/articles";
import { createClient } from "@/lib/prismic/prismicio";

const BlogListPage = async ({ searchParams }) => {
  const { query, category } = searchParams;
  const client = createClient();
  const filters = [];

  if (query) {
    filters.push(prismic.filter.fulltext("my.article.title", query));
  }

  if (category) {
    const { id: categoryId } = await client.getByUID("category", category);
    filters.push(prismic.filter.at("my.article.category", categoryId));
  }

  const posts = await fetchArticles(filters);

  if (!posts) return <p>No results found</p>;

  const intro = query
    ? `Showing ${posts.length} results for search term: ${query}`
    : null;
  return (
    <>
      <ArticlesLayout intro={intro} posts={posts} category={category} />
    </>
  );
};
export default BlogListPage;
