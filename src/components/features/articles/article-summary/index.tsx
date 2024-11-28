import type { JSX } from "react";

import { createID } from "../helpers";
import styles from "./articleSummary.module.scss";

interface Heading {
  text: string;
  level: number;
}

export const Summary = ({ headings }: { headings: Heading[] }) => {
  const createNestedList = (headings: Heading[]) => {
    const root: JSX.Element[] = []; // Top-level list
    const stack: { list: JSX.Element[]; level: number }[] = [
      { list: root, level: 2 },
    ];

    for (let i = 0; i < headings.length; i++) {
      const { text, level } = headings[i];

      while (stack.length > 0 && stack[stack.length - 1].level > level) {
        stack.pop();
      }

      if (stack.length === 0) {
        console.warn("Stack was unexpectedly empty.");
        return [];
      }

      const listItem = (
        <li key={createID(text)}>
          <a href={`#${createID(text)}`}>{text}</a>
        </li>
      );

      stack[stack.length - 1].list.push(listItem);

      const nextIndex = i + 1;
      if (nextIndex < headings.length && headings[nextIndex].level > level) {
        const sublist: JSX.Element[] = [];
        stack[stack.length - 1].list.push(
          <ul key={`sublist-${createID(text)}`}>{sublist}</ul>,
        );
        stack.push({ list: sublist, level: headings[nextIndex].level });
      }
    }

    return root;
  };

  if (headings.length === 0) return;

  return (
    <details className={styles.articleSummary}>
      <summary className={styles.title}>Jump to...</summary>
      <ul className={styles.anchors}>{createNestedList(headings)}</ul>
    </details>
  );
};
