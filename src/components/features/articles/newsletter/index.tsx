"use client";
import { Action } from "@/components/ui/action";
import { Heading } from "@/components/ui/heading";

import styles from "./newsletter.module.scss";

export const Newsletter = () => {
  return (
    <div className={styles.newsletter}>
      <Heading size="xsmall" variant="h2">
        Don’t miss out!
      </Heading>
      <p>
        Sign up to our mailing list to receive all the exciting updates and
        insights!
      </p>
      <form>
        <input type="email" placeholder="Email" />
        <Action onClick={() => console.log("subscribe")} disableAnimation>
          Subscribe
        </Action>
      </form>
    </div>
  );
};
