import clsx from "clsx";
import Image from "next/image";

import { Action } from "@/components/ui/action";
import { Heading } from "@/components/ui/heading";
import { PillCard } from "@/components/ui/pill-card";

import styles from "./ready-to-get-started.module.scss";

export const ReadyToGetStarted = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <div
            className={clsx(styles.left, "animate")}
            style={{ animationDelay: `0.2s` }}
          >
            <Heading variant="h2" size="xlarge" className={styles.heading}>
              Ready to get <b>started?</b>
            </Heading>
            <div className={styles.buttonsContainer}>
              <Action href="/book-a-call">Book a call </Action>
              <Action
                href="https://secure.tutorcruncher.com/start/1/"
                variant="white"
              >
                Start free trial
              </Action>
            </div>
          </div>
          <div className={clsx(styles.right, "animate-children")}>
            <PillCard>
              <p>Sign up for free trial today</p>
            </PillCard>
            <PillCard>
              <p>
                Pay nothing for two weeks with free cancellation if you don’t
                continue
              </p>
            </PillCard>
            <PillCard>
              <p>
                Free advice and support from the day you sign up from our
                experts
              </p>
            </PillCard>
          </div>
        </div>
        <div className={styles.artWork}>
          <Image
            src={"/img/svg/ready-one.svg"}
            alt=""
            width={843}
            height={398}
          />
          <Image
            src={"/img/svg/ready-two.svg"}
            alt=""
            width={288}
            height={263}
          />
        </div>
      </div>
    </div>
  );
};
