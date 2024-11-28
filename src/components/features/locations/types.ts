import { ReactElement } from "react";

export namespace Locations {
  export interface Location {
    name: string;
    address: ReactElement;
    phoneNumber: string;
    email: string;
    openingHours: ReactElement;
    map: string;
  }

  export interface LocationsProps {
    locations: Locations.Location[];
  }
}
