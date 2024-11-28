import ArticlesLayout from "@/layouts/articles";
import { fetchArticles } from "@/lib/prismic/articles";
import { createClient } from "@/lib/prismic/prismicio";

const PER_PAGE = 9;

const BlogListPage = async ({ params }) => {
  const client = createClient();
  const page = params.id ? parseInt(params.id) : 1;

  const { results: posts, total_results_size } = await client.getByType(
    "article",
    {
      pageSize: PER_PAGE,
      page,
      orderings: {
        field: "my.article.publishDate",
        direction: "desc",
      },
      fetchLinks: "category.title",
    }
  );

  const totalPages = Math.ceil(total_results_size / PER_PAGE);
  return <ArticlesLayout posts={posts} totalPages={totalPages} page={page} />;
};

const generateStaticParams = async () => {
  const allPosts = await fetchArticles();
  const totalPages = Math.ceil(allPosts.length / PER_PAGE);

  const params = Array.from({ length: totalPages - 1 }, (v, i) => ({
    id: (i + 2).toString(),
  }));

  return params;
};

export { generateStaticParams };
export default BlogListPage;
