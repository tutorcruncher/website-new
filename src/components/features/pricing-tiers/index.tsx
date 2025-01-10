"use client";

import { TIERS } from "app/(default)/pricing/data/pricing";
import Link from "next/link";

import { Action } from "@/components/ui/action";
import { Body } from "@/components/ui/body";
import { PillCard } from "@/components/ui/pill-card";
import { TickSvg } from "@/svgs/tick";

import styles from "./pricing-tiers.module.scss";
import TrackingLink from "@/components/ui/tracking-link/tracking-link";

const TierPricing = ({ tier, region }) => {
  const pricing = region.pricing[tier.pricing];

  const PricingHeader = () => (
    <div className={styles.heading}>
      <h2 className={styles.title}>{tier.name}</h2>
      <p className={styles.description}>{tier.description}</p>
    </div>
  );

  const PricingDetails = () => (
    <>
      <p className={styles.startingFrom}>Starting from</p>
      <h3>
        {region?.currency}
        {pricing?.base_price}
        <span className={styles.billingCycle}>/month</span>
      </h3>
    </>
  );

  return (
    <div className={styles.pricing}>
      <PricingHeader />
      <PricingDetails />
    </div>
  );
};

export const PricingTiers = ({ region }) => {
  return (
    <Body containerSize="large" spacing="small">
      <div className={styles.pricingTiers}>
        {TIERS.map((tier) => {
          return (
            <div className={styles.pricingTier} key={tier.pricing}>
              <TierPricing region={region} tier={tier} />
              {tier.featuresList
                .filter((f) => f.regions.includes(region.region_code))
                .map((featuresList) => (
                  <div
                    className={styles.featuresList}
                    key={featuresList.heading}
                  >
                    <h4>{featuresList.heading}</h4>
                    <ul className={styles.features}>
                      {featuresList.features.map((feature) => (
                        <li className={styles.feature} key={feature}>
                          <span>
                            <TickSvg />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              <div className={styles.buttonWrapper}>
                <Action
                  href={tier.solutionUrl}
                  variant="outline"
                  fullwidth
                  size="small"
                >
                  Find out more
                </Action>
                <TrackingLink
                  url={`https://secure.tutorcruncher.com/start/1/?plan=${tier.pricing}`}
                  text="Get Started"
                  variant="solid"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.pricingCalculatorCta}>
        <PillCard>
          <p>
            Want to estimate which the best price plan would be for you, and how
            much you would be charged? <br />
            <Link href={`/pricing-calculator/${region.region_code}`}>
              Click here to use our pricing calculator.
            </Link>
          </p>
        </PillCard>
      </div>
    </Body>
  );
};
