import clsx from "clsx";

import { Action } from "@/components/ui/action";
import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";

import styles from "./solution-hero.module.scss";
import { HeroProps } from "./types";

export const SolutionHero = ({ heading, pricing, intro }: HeroProps) => {
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
      {pricing ? (
        <div
          className={clsx(styles.pricing, "animate")}
          style={{ animationDelay: "0.4s" }}
        >
          {pricing}
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
