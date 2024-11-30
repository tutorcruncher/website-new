"use client";

import { TIERS } from "app/(default)/pricing/data/pricing";
import Link from "next/link";

import { Action } from "@/components/ui/action";
import { Body } from "@/components/ui/body";
import { PillCard } from "@/components/ui/pill-card";
import { TickSvg } from "@/svgs/tick";

import styles from "./pricing-tiers.module.scss";

const TierPricing = ({ tier, region }) => {
  const pricing = region.pricing[tier.pricing];

  if (region.region_code === "gb") {
    return (
      <div className={styles.pricing}>
        <h2 className={styles.title}>{tier.name}</h2>
        <p className={styles.startingFrom}>Starting from</p>
        <h3>
          {region?.currency}
          {pricing?.base_price}
          <span className={styles.billingCycle}>p/m</span>
        </h3>
      </div>
    );
  }

  return (
    <div className={styles.pricing}>
      <h2 className={styles.title}>{tier.name}</h2>
      <h3>
        {region?.currency}
        {pricing?.base_price}
        <span className={styles.billingCycle}>p/m</span>
      </h3>
      <span className={styles.additional}>
        + {pricing.revenue_percentage}% revenue fee
      </span>
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
                  href="https://secure.tutorcruncher.com/start/1/"
                  variant="outline"
                >
                  Get started
                </Action>
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
            <Link href="/pricing-calculator">
              Click here to use our pricing calculator.
            </Link>
          </p>
        </PillCard>
      </div>
    </Body>
  );
};
