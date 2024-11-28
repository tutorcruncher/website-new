import clsx from "clsx";
import Image from "next/image";

import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";

import styles from "./stats.module.scss";
import { StatsProps } from "./types";

export const Stats = ({ heading, stats }: StatsProps) => {
  return (
    <Body
      background="cream"
      heading={
        <Heading center size="small" variant="div">
          {heading}
        </Heading>
      }
    >
      <div className={styles.statsGrid}>
        {stats.map(({ image, percent, description }, index) => (
          <div
            key={description}
            className={clsx(styles.statsCard, "animate")}
            style={{ animationDelay: ` ${index * 0.2}s` }}
          >
            <Image
              src={image.url}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
            <Heading size="small" variant="h3" noMargin>
              {percent}
            </Heading>
            <p className={styles.description}>{description}</p>
          </div>
        ))}
      </div>
    </Body>
  );
};
