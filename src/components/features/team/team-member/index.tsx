import { Heading } from "@/components/ui/heading";

import styles from "./team-member.module.scss";
import { TeamMemberProps } from "./types";
import { PrismicNextImage } from "@prismicio/next";

export const TeamMember = ({ image, name, role }: TeamMemberProps) => {
  return (
    <div className={styles.teamMember}>
      <div className={styles.imageContainer}>
        <PrismicNextImage field={image} fallbackAlt="" />
      </div>
      <div className={styles.content}>
        <Heading size="xsmall" variant="h3" noMargin>
          {name}
        </Heading>
        <p className={styles.role}>{role}</p>
      </div>
    </div>
  );
};
