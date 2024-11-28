import { Suspense } from "react";

import { Categories } from "@/components/Posts/Categories";
import { Search } from "@/components/Posts/Search";

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
