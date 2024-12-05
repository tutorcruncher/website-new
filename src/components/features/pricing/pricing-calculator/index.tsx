"use client";
import clsx from "clsx";
import React, { useState } from "react";
import { NumericFormat } from "react-number-format";

import { Action } from "@/components/ui/action";

import { tiers } from "./data";
import styles from "./pricing-calculator.module.scss";
import { calculateFees } from "./utils";
import Link from "next/link";
import { ChevronDown } from "@/svgs/chevron-down";
import { ArrowLink } from "@/components/ui/arrow-link";

const TierBreakdown = ({
  tier,
  prices,
  revenue,
  currency,
  isRecommended = false,
}) => {
  const { revenuePercentage, totalAmount } = calculateFees(revenue, prices);

  return (
    <div
      className={clsx(styles.tierOption, [isRecommended && styles.recommended])}
    >
      <h3 className={styles.tierName}>{tier.name}</h3>
      {tier.key === "enterprise" ? (
        <>
          <p>To discuss the Enterprise plan please get in touch.</p>
          <div className={styles.ctaBtn}>
            <Action href="/book-a-call" variant="white" fullwidth>
              Book a call
            </Action>
          </div>
        </>
      ) : (
        <div className={styles.tierBreakdown}>
          <p>
            Breakdown <span>(per month)</span>
          </p>
          <hr />
          <div className={styles.breakdownContainer}>
            <BreakdownLine
              label="Base Fee"
              amount={prices.base_price}
              currency={currency}
            />
            <BreakdownLine
              label="Revenue %"
              amount={revenuePercentage}
              currency={currency}
            />
            <div id="total-fee" className={styles.breakdownTotal}>
              <span className="name">Total Fee</span>
              <span className={styles.amount}>
                {currency}
                <span>{totalAmount}</span>
              </span>
            </div>
            <Action href="/book-a-call" variant="white" fullwidth>
              Book a call
            </Action>
          </div>
        </div>
      )}
    </div>
  );
};

const BreakdownLine = ({ label, amount, currency }) => (
  <div className={styles.breakdownLine}>
    <span className="name">{label}</span>
    <span className={styles.amount}>
      {currency}
      <span>{amount}</span>
    </span>
  </div>
);

export const PriceCalculator = ({ region }) => {
  const [revenue, setRevenue] = useState(0);

  const currency = region.currency;
  const pricing = region.pricing;
  const enterpriseRevenueLimit = pricing.enterprise_limit;

  const { totalAmount: paygTotalAmount } = calculateFees(
    Number(revenue),
    pricing.payg
  );
  const { totalAmount: startupTotalAmount } = calculateFees(
    Number(revenue),
    pricing.startup
  );

  let recommendedTier = "payg";

  if (Number(revenue) * 12 >= enterpriseRevenueLimit) {
    recommendedTier = "enterprise";
  } else if (startupTotalAmount <= paygTotalAmount) {
    recommendedTier = "startup";
  }

  return (
    <div>
      <p className={styles.intro}>
        Use our pricing calculator to work out how much you would be charged.
      </p>
      <div className={styles.calculatorInputContainer}>
        Our revenue is {""}
        <span>
          {currency}
          <NumericFormat
            id="revenue-input"
            placeholder="revenue"
            value={revenue}
            onValueChange={({ floatValue }) => {
              return setRevenue(floatValue || 0);
            }}
            className={styles.revenue}
            thousandSeparator
            allowNegative={false}
          />
        </span>
        &nbsp;per month
      </div>

      <div className="calculator-details">
        <div className={styles.calculatorOptions}>
          {tiers.map((tier) => {
            const prices = pricing[tier.key];
            const isRecommended = tier.key === recommendedTier;
            return (
              <TierBreakdown
                key={tier.key}
                tier={tier}
                prices={prices}
                revenue={revenue}
                currency={currency}
                isRecommended={isRecommended}
              />
            );
          })}
        </div>
      </div>
      <p className={styles.terms}>
        The prices above excludes any support package you have selected after
        your first 3 months and any fees from our integrated payment providers,
        see our Terms and Conditions for more info.
      </p>
      <ArrowLink href="/pricing" text="Back to pricing" direction="backward" />
    </div>
  );
};
