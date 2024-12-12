import clsx from "clsx";

import { Heading } from "@/components/ui/heading";

import styles from "./feature-card.module.scss";
import { FeatureCardProps } from "./types";
import { PrismicNextImage } from "@prismicio/next";

export const FeatureCard = ({ icon, title, onClick }: FeatureCardProps) => {
  const classes = clsx(styles.infoCard);
  return (
    <button type="button" onClick={onClick} className={classes}>
      {icon?.url ? (
        <div className={styles.imageWrapper}>
          <PrismicNextImage field={icon} fallbackAlt="" />
        </div>
      ) : null}
      <Heading size="xxsmall" className={styles.heading} variant="h2">
        {title}
      </Heading>
    </button>
  );
};
