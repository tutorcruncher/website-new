import Link from "next/link";

import ClientSideCategories from "@/components/Posts/Categories/Categories";
import { Tag } from "@/components/ui/tag";
import { createClient } from "@/lib/prismic/prismicio";

import styles from "./categories.module.scss";

export const Categories = async ({
  activeCategory,
}: {
  activeCategory?: string;
}) => {
  const client = createClient();
  const categories = await client.getAllByType("category");

  const tags = categories.map((category) => {
    const isActive = activeCategory === category.uid;
    return (
      <Link
        key={category.uid}
        href={`/blog/search?category=${category.uid}`}
        className={styles.categoryTag}
      >
        <Tag title={category.data.title} active={isActive} />
      </Link>
    );
  });

  const activeCategoryTitle = categories.find(
    (category) => category.uid === activeCategory
  )?.data.title;

  return (
    <ClientSideCategories
      tags={tags}
      activeCategoryTitle={activeCategoryTitle}
    />
  );
};
