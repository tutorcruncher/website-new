import clsx from "clsx";
import Image from "next/image";

import { Heading } from "@/components/ui/heading";

import styles from "./info-card.module.scss";
import { InfoCardProps } from "./types";

export const InfoCard = ({
  icon,
  title,
  intro,
  onClick,
  fullWidth = false,
}: InfoCardProps) => {
  const classes = clsx(styles.infoCard, [fullWidth && styles.fullWidth]);
  return (
    <button type="button" onClick={onClick} className={classes}>
      {icon?.url ? (
        <div className={clsx([!fullWidth && styles.iconWrapper])}>
          <Image
            src={icon.url}
            width={icon.width}
            height={icon.height}
            alt={icon.alt}
          />
        </div>
      ) : null}
      <div className={styles.content}>
        <Heading size="xsmall" className={styles.heading} variant="h3" noMargin>
          {title}
        </Heading>
        <p>{intro}</p>
      </div>
    </button>
  );
};
