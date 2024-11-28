import type { ReactElement } from "react";

export interface ReleaseProp {
  name: string;
  date: string;
  changes: ReactElement;
}

export interface ReleaseListProps {
  releases: ReleaseProp[];
}
