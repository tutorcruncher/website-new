"use client";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Locations } from "../types";
import styles from "./location-item.module.scss";

export const LocationItem = ({
  location,
  isLoaded,
}: {
  location: Locations.Location;
  isLoaded: boolean;
}) => {
  return (
    <div className={styles.locationItem}>
      <div className={styles.map}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "100%",
            }}
            zoom={15}
            center={{ lat: +location.latitude, lng: +location.longitude }}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
            }}
          >
            <Marker
              position={{ lat: +location.latitude, lng: +location.longitude }}
            />
          </GoogleMap>
        ) : null}
      </div>
      <div className={styles.information}>
        <address className={styles.address}>
          <h2 className={styles.title}>{location.name}</h2>
          {location.address}
        </address>
        <div className={styles.contactDetails}>
          <h2>Contact</h2>
          <p>
            <a href={`tel:${location.phoneNumber}`}>{location.phoneNumber}</a>
          </p>
          <p>
            <a href={`mailto:${location.email}`}>{location.email}</a>
          </p>
        </div>
        <div className={styles.openingHours}>
          <h2>Opening hours</h2>
          {location.openingHours}
        </div>
      </div>
    </div>
  );
};
