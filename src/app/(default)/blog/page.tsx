import { Metadata } from "next/types";

import { formatMetaData } from "@/helpers/metaData";
import ArticlesLayout from "@/layouts/articles";
import { fetchArticles } from "@/lib/prismic/articles";

const PER_PAGE = 9;

export async function generateMetadata(): Promise<Metadata> {
  const url = `https://tutorcruncher.com/blog`;
  const title = "Tutor Blog (Resources & Latest News) - TutorCruncher";
  const description =
    "Keep up-to-date with the latest news and resources on our blog. Here we discuss everything from online teaching to the latest news in the tutoring industry.";

  return formatMetaData(title, description, url);
}

const BlogListPage = async ({ params }) => {
  const allPosts = await fetchArticles();

  const page = params.id ? parseInt(params.id[1]) : 1;
  const totalPages = Math.ceil(allPosts.length / PER_PAGE);
  const posts = allPosts.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <ArticlesLayout posts={posts} totalPages={totalPages} page={page} />;
    </>
  );
};

const generateStaticParams = async () => {
  const allPosts = await fetchArticles();
  const n = Math.ceil(allPosts.length / PER_PAGE);
  const arr = Array.from({ length: n }, (v, i) => {
    return i === 0
      ? undefined
      : {
          id: ["page", i.toString()],
        };
  });
  return arr;
};

export { generateStaticParams };
export default BlogListPage;
