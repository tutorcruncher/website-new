import clsx from "clsx";
import Link from "next/dist/client/link";

import styles from "./pagination.module.scss";

interface PaginationProps {
  currentPage: number;
  pages: number;
}

export const Pagination = ({ pages, currentPage }: PaginationProps) => {
  if (pages === 1) return;
  return (
    <nav className={styles.pagination}>
      <ul>
        {Array.from({ length: pages }).map((_, i) => {
          const page = i + 1;
          const activePage = page === currentPage;
          const href = page === 1 ? "/blog" : `/blog/page/${page}`;
          return (
            <li key={i}>
              <Link
                href={href}
                className={clsx(styles.page, [activePage && styles.active])}
              >
                {i + 1}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
