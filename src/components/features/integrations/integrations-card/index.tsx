import clsx from "clsx";
import Image from "next/image";

import { Heading } from "@/components/ui/heading";

import styles from "./integrations-card.module.scss";
import { IntegrationCardProps } from "./types";

export const IntegrationCard = ({
  logo,
  title,
  intro,
  onClick,
}: IntegrationCardProps) => {
  const classes = clsx(
    styles.integrationCard,
    styles[`intergration_${title.replace(" ", "-").toLowerCase()}`]
  );
  return (
    <button type="button" onClick={onClick} className={classes}>
      <div className={styles.logoWrapper}>
        {logo?.url ? (
          <Image
            src={logo.url}
            width={logo.width}
            height={logo.height}
            alt={logo.alt}
          />
        ) : (
          <span className={styles.logoLetter}>{title.charAt(0)}</span>
        )}
      </div>
      <div className={styles.content}>
        <Heading size="xsmall" className={styles.heading} variant="h3" noMargin>
          {title}
        </Heading>
        <p>{intro}</p>
      </div>
    </button>
  );
};
