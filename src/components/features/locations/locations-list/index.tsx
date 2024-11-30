"use client";
import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";

import { LocationItem } from "../location-item";
import { Locations } from "../types";
import styles from "./location-list.module.scss";
import { useJsApiLoader } from "@react-google-maps/api";

export const LocationsList = ({ locations }: Locations.LocationsProps) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

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
          <LocationItem
            location={location}
            key={location.name}
            isLoaded={isLoaded}
          />
        ))}
      </div>
    </Body>
  );
};
