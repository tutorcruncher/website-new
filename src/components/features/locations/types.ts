import { ReactElement } from "react";

export interface Location {
  name: string;
  address: ReactElement;
  phoneNumber: string;
  email: string;
  openingHours: ReactElement;
  latitude: string;
  longitude: string;
}

export interface LocationsProps {
  locations: Location[];
}
