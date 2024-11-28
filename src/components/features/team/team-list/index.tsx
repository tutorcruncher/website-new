import clsx from "clsx";
import type { ReactNode } from "react";

import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";

import { TeamMember } from "../team-member";
import styles from "./team-list.module.scss";

interface TeamListProps {
  heading: ReactNode;
  team: any;
  variant?: "default" | "sales";
}

export const TeamList = ({
  heading,
  team,
  variant = "default",
}: TeamListProps) => {
  return (
    <Body
      heading={
        <Heading variant="div" noMargin center>
          {heading}
        </Heading>
      }
    >
      <div className={clsx(styles.teamList, styles[`variant-${variant}`])}>
        {team.map((member) => (
          <TeamMember
            key={member.name}
            image={member.image}
            name={member.name}
            role={member.role}
            intro={member.intro}
          />
        ))}
      </div>
    </Body>
  );
};
