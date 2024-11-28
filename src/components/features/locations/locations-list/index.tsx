import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";

import { LocationItem } from "../location-item";
import { Locations } from "../types";
import styles from "./location-list.module.scss";

export const LocationsList = ({ locations }: Locations.LocationsProps) => {
  return (
    <Body
      containerSize="medium"
      background="blue"
      heading={
        <Heading variant="h2" size="large" center>
          Our Locations
        </Heading>
      }
    >
      <div className={styles.locationList}>
        {locations.map((location) => (
          <LocationItem location={location} key={location.name} />
        ))}
      </div>
    </Body>
  );
};
