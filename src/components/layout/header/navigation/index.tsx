"use client";

import clsx from "clsx";
import { usePathname } from "next/dist/client/components/navigation";
import Link from "next/dist/client/link";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";

import { Action } from "@/components/ui/action";

import styles from "./navigation.module.scss";
import { SolutionsMenu } from "./solutions-menu";

const NavigationItems = [
  {
    title: "Home",
    link: "/",
    mobileOnly: true,
  },
  {
    title: "Solutions",
    link: "/solutions",
  },
  {
    title: "Integrations",
    link: "/integrations",
  },
  {
    title: "Pricing",
    link: "/pricing",
  },
  {
    title: "Blog",
    link: "/blog",
  },
];

interface NavigationProps {
  navigationOpen: boolean;
  setNavigationOpen: any; // TODO
}

export const Navigation = ({
  navigationOpen,
  setNavigationOpen,
}: NavigationProps) => {
  const pathname = usePathname();
  const [solutionsVisbile, setSolutionsVisible] = useState(false);

  const handleToggleSolutionsMenu = (event) => {
    event.stopPropagation();
    setSolutionsVisible((prev) => !prev);
  };

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const linkHrefPathname = new URL(event.currentTarget.href).pathname;
    if (linkHrefPathname === pathname) {
      setNavigationOpen(false);
      setSolutionsVisible(false);
    }
  };

  useEffect(() => {
    setNavigationOpen(false);
    setSolutionsVisible(false);
    document.body.className = "";
  }, [pathname, setNavigationOpen]);

  return (
    <nav className={clsx(styles.primaryNav, [navigationOpen && styles.open])}>
      <ul>
        {NavigationItems.map((item) => {
          return (
            <li
              key={item.title}
              className={clsx(styles.hasChildren, {
                [styles.mobileOnly]: item.mobileOnly,
              })}
            >
              {item.title === "Solutions" ? (
                <>
                  <button
                    type="button"
                    onClick={handleToggleSolutionsMenu}
                    className={clsx(
                      styles.navigationLink,
                      solutionsVisbile && styles.solutionsVisible,
                    )}
                  >
                    <span>{item.title}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>
                  <SolutionsMenu
                    solutionsVisbile={solutionsVisbile}
                    setSolutionsVisible={setSolutionsVisible}
                  />
                </>
              ) : (
                <Link
                  href={item.link}
                  className={styles.navigationLink}
                  onClick={(e) => handleLinkClick(e)}
                >
                  {item.title}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      <div className={styles.mobileActions}>
        <Action href="https://secure.tutorcruncher.com/" variant="outline">
          Login
        </Action>
        <Action href="https://secure.tutorcruncher.com/start/1/?tc_source=google.com">
          Start free trial
        </Action>
      </div>
    </nav>
  );
};
