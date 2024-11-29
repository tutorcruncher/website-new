"use client";
import clsx from "clsx";
import React, { useState } from "react";
import { NumericFormat } from "react-number-format";

import { Action } from "@/components/ui/action";

import { tiers } from "./data";
import styles from "./pricing-calculator.module.scss";
import { calculateGBFees } from "./utils";
import Link from "next/link";
import { ChevronDown } from "@/svgs/chevron-down";

const TierBreakdown = ({
  tier,
  prices,
  revenue,
  onlinePercent,
  currency,
  isRecommended = false,
}) => {
  const { onlineAmount, offlineAmount, totalAmount } = calculateGBFees(
    revenue,
    onlinePercent,
    prices
  );

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
              label="Online card fees"
              amount={onlineAmount}
              currency={currency}
            />
            <BreakdownLine
              label="Offline charges fee"
              amount={offlineAmount}
              currency={currency}
            />
            <div id="total-fee" className={styles.breakdownTotal}>
              <span className="name">Total Fee</span>
              <span className={styles.amount}>
                {currency}
                <span>{totalAmount}</span>
              </span>
            </div>
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

export const PriceCalculatorGB = ({ region }) => {
  const [revenue, setRevenue] = useState(15000);
  const [onlinePercent, setOnlinePercent] = useState(10);

  const currency = region.currency;
  const pricing = region.pricing;
  const enterpriseRevenueLimit = pricing.enterprise_limit;

  const { totalAmount: paygTotalAmount } = calculateGBFees(
    Number(revenue),
    onlinePercent,
    pricing.payg
  );
  const { totalAmount: startupTotalAmount } = calculateGBFees(
    Number(revenue),
    onlinePercent,
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
        &nbsp;per month and we will process
        <span className="percentage-input">
          <NumericFormat
            id="online-percent-input"
            placeholder="Total"
            value={onlinePercent}
            onValueChange={({ floatValue }) => {
              if (Number(floatValue) <= 100) {
                setOnlinePercent(floatValue);
              }
            }}
            thousandSeparator
            allowNegative={false}
            isAllowed={({ floatValue }) => floatValue <= 100}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") {
                setOnlinePercent((prevValue) => {
                  const newValue = Math.min(Number(prevValue) + 1, 100);
                  return newValue;
                });
              } else if (e.key === "ArrowDown") {
                setOnlinePercent((prevValue) => {
                  const newValue = Math.max(Number(prevValue) - 1, 0);
                  return newValue;
                });
              }
            }}
          />
          %
        </span>
        &nbsp;of our payments online.
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
                onlinePercent={onlinePercent}
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
      <div className={styles.backToLinkContainer}>
        <Link href="/pricing" className={styles.backToLink}>
          <ChevronDown />
          <span>Back to pricing</span>
        </Link>
      </div>
    </div>
  );
};
