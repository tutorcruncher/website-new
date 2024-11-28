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

  if (tier.name === "Enterprise") {
    return (
      <div className={styles.pricing}>
        <h2 className={styles.title}>{tier.name}</h2>
        <h3>Custom</h3>
        <span className={styles.additional}>{tier.additional}</span>
      </div>
    );
  }

  if (region.region_code === "gb") {
    return (
      <div className={styles.pricing}>
        <h2 className={styles.title}>{tier.name}</h2>
        <h3>
          {region?.currency}
          {pricing?.base_price}
          <span className={styles.billingCycle}>p/m</span>
        </h3>
        <span className={styles.additional}>+ payment fees</span>
      </div>
    );
  }

  return (
    <div className={styles.pricing}>
      <h2 className={styles.title}>{tier.name}</h2>
      <h3>
        {region?.currency}
        {pricing?.base_price}
        <span className={styles.billingCycle}>{tier?.billingCycle}</span>
      </h3>
      <span className={styles.additional}>
        + {pricing.revenue_percentage}% of revenue
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt{" "}
            <Link href="/pricing-calculator">
              [Pricing calculator link text].
            </Link>
          </p>
        </PillCard>
      </div>
    </Body>
  );
};
