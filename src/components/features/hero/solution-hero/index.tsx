"use client";
import clsx from "clsx";

import { Action } from "@/components/ui/action";
import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";

import styles from "./solution-hero.module.scss";
import { HeroProps } from "./types";
import { useEffect, useState } from "react";
import { regions } from "app/data/regions/regions";

export const SolutionHero = ({ heading, pricingTier, intro }: HeroProps) => {
  const [region, setRegion] = useState(null);

  useEffect(() => {
    const fetchRegion = async () => {
      try {
        const response = await fetch("api/region");
        const { country_code } = await response.json();
        const fetchedRegion = regions.find(
          (region) => region.region_code === country_code.toLowerCase()
        );
        setRegion(fetchedRegion);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRegion();
  }, []);

  const basePrice = region?.pricing[pricingTier].base_price;
  const fromPrice = basePrice
    ? `From ${region.currency}${basePrice} per month`
    : null;
  return (
    <Body
      heading={
        <Heading variant="div" size="xlarge" noMargin center>
          {heading}
        </Heading>
      }
      spacing="small"
      background="blue"
    >
      {intro ? (
        <div
          className={clsx(styles.intro, "animate")}
          style={{ animationDelay: "0.2s" }}
        >
          <Heading variant="h2" noMargin>
            {intro}
          </Heading>
        </div>
      ) : null}
      {fromPrice ? (
        <div
          className={clsx(styles.pricing, "animate")}
          style={{ animationDelay: "0.4s" }}
        >
          {fromPrice}
        </div>
      ) : null}
      <div
        className={clsx(styles.buttonsContainer, "animate")}
        style={{ animationDelay: "0.6s" }}
      >
        <Action href="/book-a-call">Book a call </Action>
        <Action
          href="https://secure.tutorcruncher.com/start/1/"
          variant="white"
        >
          Start free trial
        </Action>
      </div>
    </Body>
  );
};
