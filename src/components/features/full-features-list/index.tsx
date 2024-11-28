import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";

import { ENTERPRISE_FEATURES, PRO_FEATURES, STARTER_FEATURES } from "./data";
import styles from "./full-features-list.module.scss";

const getAllFeatures = () => {
  const allFeatures = {};

  const mergeFeatures = (features, plan) => {
    Object.keys(features).forEach((category) => {
      if (!allFeatures[category]) {
        allFeatures[category] = {};
      }

      features[category].forEach((feature) => {
        if (!allFeatures[category][feature.title]) {
          allFeatures[category][feature.title] = {
            Starter: false,
            Pro: false,
            Enterprise: false,
          };
        }
        allFeatures[category][feature.title][plan] = true;
      });
    });
  };

  mergeFeatures(STARTER_FEATURES, "Starter");
  mergeFeatures(PRO_FEATURES, "Pro");
  mergeFeatures(ENTERPRISE_FEATURES, "Enterprise");

  return allFeatures;
};

export const Tick = () => (
  <span className={styles.tick}>
    <svg
      aria-hidden="true"
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5 16.3281C7.41146 16.3281 6.38542 16.1198 5.42188 15.7031C4.46354 15.2865 3.61719 14.7109 2.88281 13.9766C2.14844 13.2422 1.57292 12.3958 1.15625 11.4375C0.739583 10.474 0.53125 9.44792 0.53125 8.35938C0.53125 7.27083 0.739583 6.2474 1.15625 5.28906C1.57292 4.32552 2.14583 3.47656 2.875 2.74219C3.60938 2.00781 4.45573 1.43229 5.41406 1.01562C6.3776 0.598958 7.40365 0.390625 8.49219 0.390625C9.58073 0.390625 10.6068 0.598958 11.5703 1.01562C12.5339 1.43229 13.3828 2.00781 14.1172 2.74219C14.8516 3.47656 15.4271 4.32552 15.8438 5.28906C16.2604 6.2474 16.4688 7.27083 16.4688 8.35938C16.4688 9.44792 16.2604 10.474 15.8438 11.4375C15.4271 12.3958 14.8516 13.2422 14.1172 13.9766C13.3828 14.7109 12.5339 15.2865 11.5703 15.7031C10.612 16.1198 9.58854 16.3281 8.5 16.3281ZM7.625 12.1719C7.76042 12.1719 7.88281 12.1406 7.99219 12.0781C8.10156 12.0156 8.19792 11.9219 8.28125 11.7969L11.9531 6.00781C12 5.92969 12.0443 5.84635 12.0859 5.75781C12.1276 5.66927 12.1484 5.58073 12.1484 5.49219C12.1484 5.3099 12.0807 5.16667 11.9453 5.0625C11.8099 4.95312 11.6589 4.89844 11.4922 4.89844C11.263 4.89844 11.0755 5.01823 10.9297 5.25781L7.59375 10.6172L6.00781 8.57031C5.90885 8.4401 5.8125 8.35156 5.71875 8.30469C5.63021 8.25781 5.52865 8.23438 5.41406 8.23438C5.23698 8.23438 5.08854 8.29948 4.96875 8.42969C4.84896 8.55469 4.78906 8.70573 4.78906 8.88281C4.78906 8.97135 4.80469 9.0599 4.83594 9.14844C4.8724 9.23177 4.91927 9.3125 4.97656 9.39062L6.9375 11.7969C7.04167 11.9323 7.14844 12.0286 7.25781 12.0859C7.36719 12.1432 7.48958 12.1719 7.625 12.1719Z"
        fill="black"
      ></path>
    </svg>
    <span data-testid="text-sr-only" className="sr-only">
      Available
    </span>
  </span>
);

export const FullFeaturesList = () => {
  const allFeatures = getAllFeatures();
  return (
    <Body
      containerSize="large"
      background="cream"
      spacing="small"
      heading={
        <Heading variant="h2" center>
          Full Features
        </Heading>
      }
    >
      {Object.keys(allFeatures).map((category) => (
        <div key={category} className={styles.fullFeaturesList}>
          <Heading size="xsmall" variant="h3">
            {category}
          </Heading>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Starter</th>
                <th>Pro</th>
                <th>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(allFeatures[category]).map((featureTitle, index) => (
                <tr key={index}>
                  <td>{featureTitle}</td>
                  <td>
                    {allFeatures[category][featureTitle].Starter ? (
                      <Tick />
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {allFeatures[category][featureTitle].Pro ? <Tick /> : ""}
                  </td>
                  <td>
                    {allFeatures[category][featureTitle].Enterprise ? (
                      <Tick />
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </Body>
  );
};
