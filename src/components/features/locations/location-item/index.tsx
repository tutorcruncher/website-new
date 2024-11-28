import { Locations } from "../types";
import styles from "./location-item.module.scss";

export const LocationItem = ({
  location,
}: {
  location: Locations.Location;
}) => {
  return (
    <div className={styles.locationItem}>
      <div className={styles.map}>
        <iframe width="100%" frameBorder={0} src={location.map}></iframe>
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
