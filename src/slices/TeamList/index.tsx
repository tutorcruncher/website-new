import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import type { JSX } from "react";

import { BookingWidget } from "@/components/features/booking-widget";
import { TeamList as TeamListComponent } from "@/components/features/team/team-list";

/**
 * Props for `TeamList`.
 */
export type TeamListProps = SliceComponentProps<Content.TeamListSlice>;

/**
 * Component for "TeamList" Slices.
 */
const TeamList = ({ slice }: TeamListProps): JSX.Element => {
  const heading = <PrismicRichText field={slice.primary.heading} />;

  const team = slice.primary.team_members.map((teamMember) => {
    return {
      name: teamMember.name,
      role: teamMember.role,
      image: teamMember.image,
    };
  });

  if (slice.variation === "salesTeam") {
    return (
      <>
        <BookingWidget />
      </>
    );
  }

  return (
    <TeamListComponent heading={heading} team={team} variant={"default"} />
  );
};

export default TeamList;
