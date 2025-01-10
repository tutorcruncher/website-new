import { Suspense } from "react";

import { Categories } from "@/components/features/articles/categories";
import { Search } from "@/components/features/articles/search";

import styles from "./categorySearchFilterBar.module.scss";

export const CategorySearchFilterBar = ({
  activeCategory,
}: {
  activeCategory?: string;
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <Suspense>
          <Search />
        </Suspense>
        <Categories activeCategory={activeCategory} />
      </div>
    </div>
  );
};
