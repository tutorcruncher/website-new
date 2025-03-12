import { Heading } from "@/components/ui/heading";

import type { ReleaseProp } from "../types";
import styles from "./release.module.scss";

export const Release = ({ name, date, changes }: ReleaseProp) => (
  <div className={styles.release}>
    <Heading size="small" variant="h2" noMargin>
      {date.toString()}
    </Heading>
    <p>{name}</p>
    {changes}
  </div>
);
