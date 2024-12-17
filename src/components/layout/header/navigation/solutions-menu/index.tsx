import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { Heading } from "@/components/ui/heading";

import { SOLUTIONS_MENU } from "./data";
import styles from "./solutions-menu.module.scss";
import { TickSvg } from "@/svgs/tick";

export const SolutionsMenu = ({ solutionsVisbile, setSolutionsVisible }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.textContent === "Solutions") {
        return;
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setSolutionsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, setSolutionsVisible]);

  return (
    <div
      ref={menuRef}
      className={clsx(
        styles.solutionsMenu,
        solutionsVisbile && styles.solutionsVisible
      )}
    >
      <button
        type="button"
        onClick={() => setSolutionsVisible(false)}
        className={styles.mobleMenuToggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
        Back to menu
      </button>
      <div className={styles.solutionsMenu__inner}>
        {SOLUTIONS_MENU.map((solution) => (
          <Link
            href={solution.url}
            className={styles.card}
            key={solution.title}
          >
            <div className={styles.imageContainer}>
              <Image src={solution.image} alt="" width={400} height={600} />
            </div>
            <p className={styles.heading}>{solution.title}</p>
            <p className={styles.subHeading}>
              Our <b>{solution.pricePlan}</b> package gives you:
            </p>
            <ul className={styles.description}>
              {solution.description.map((item) => (
                <li key={item}>
                  <TickSvg />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </div>
  );
};
