import { CategorySearchFilterBar } from "@/components/features/articles/categorySearchFilterBar";
import { Pagination } from "@/components/features/pagination";
import { Posts } from "@/components/features/articles/articles-list";
import { Body } from "@/components/ui/body";
import { Hero } from "@/components/ui/hero";

import { ArticlesLayoutProps } from "./types";

const ArticlesLayout = async ({
  intro,
  posts,
  totalPages,
  page,
  category,
}: ArticlesLayoutProps) => {
  return (
    <>
      <Hero heading={<b>Knowledge Hub</b>} intro={intro} />
      <Body spacing="none" background="blue">
        <CategorySearchFilterBar activeCategory={category} />
        {posts.length > 0 ? (
          <Posts posts={posts} />
        ) : (
          <p>No articles available.</p>
        )}
      </Body>
      {totalPages && page ? (
        <Pagination pages={totalPages} currentPage={page} />
      ) : null}
    </>
  );
};

export default ArticlesLayout;
