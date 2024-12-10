import clsx from "clsx";
import Image from "next/image";

import { Heading } from "@/components/ui/heading";

import styles from "./feature-card.module.scss";
import { FeatureCardProps } from "./types";

export const FeatureCard = ({
  icon,
  title,
  intro,
  onClick,
}: FeatureCardProps) => {
  const classes = clsx(styles.infoCard);
  return (
    <button type="button" onClick={onClick} className={classes}>
      {icon?.url ? (
        <div className={styles.imageWrapper}>
          <Image
            src={icon.url}
            width={icon.width}
            height={icon.height}
            alt={icon.alt}
          />
        </div>
      ) : null}
      <Heading size="xxsmall" className={styles.heading} variant="h2">
        {title}
      </Heading>
    </button>
  );
};
