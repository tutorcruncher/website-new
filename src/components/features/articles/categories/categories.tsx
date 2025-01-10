"use client";

import clsx from "clsx";
import { JSX, useEffect, useRef, useState } from "react";

import { FocusTrap } from "@/components/accessibility/focus-trap";
import { Action } from "@/components/ui/action";
import { FilterSvg } from "@/svgs/filter";

import styles from "./categories.module.scss";
import { CloseSvg } from "@/svgs/close";
import Link from "next/link";

const Categories = ({
  tags,
  activeCategoryTitle,
}: {
  tags: JSX.Element[];
  activeCategoryTitle?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (menuRef.current,
        buttonRef.current &&
          !buttonRef.current.contains(event.target) &&
          !menuRef.current.contains(event.target))
      ) {
        setIsVisible(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, menuRef, setIsVisible]);

  useEffect(() => {
    setIsVisible(false);
  }, [activeCategoryTitle]);

  return (
    <div className={styles.categoriesWrapper}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.categoryToggle}
        onClick={() => setIsVisible(!isVisible)}
      >
        <FilterSvg />
        <span className={styles.label}>
          {activeCategoryTitle ? activeCategoryTitle : "Filter by categories"}
        </span>
        {activeCategoryTitle ? (
          <Link href="/blog" className={styles.clearFilterBtn}>
            <CloseSvg />
          </Link>
        ) : null}
      </button>
      <FocusTrap>
        <div
          ref={menuRef}
          className={clsx(styles.categoriesList, isVisible && styles.visible)}
        >
          {tags}
          <Action
            href="/blog"
            variant="outline"
            size="small"
            fullwidth
            disabled={activeCategoryTitle === undefined}
          >
            Clear
          </Action>
        </div>
      </FocusTrap>
    </div>
  );
};

export default Categories;
