import { Release } from "../release";
import { ReleaseListProps } from "../types";
import styles from "./releases-list.module.scss";

export const ReleasesList = ({ releases }: ReleaseListProps) => (
  <div className={styles.releasesList}>
    {releases.map((r) => (
      <Release key={r.name} name={r.name} date={r.date} changes={r.changes} />
    ))}
  </div>
);
