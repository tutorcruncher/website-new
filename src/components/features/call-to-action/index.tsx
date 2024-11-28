import Image from "next/image";

import { Action } from "@/components/ui/action";
import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";

import styles from "./call-to-action.module.scss";
import { CallToActionProps } from "./types";

export const CallToAction = ({ background }: CallToActionProps) => (
  <Body containerSize="medium" background={background} spacing="small">
    <div className={styles.callToAction}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <Heading variant="h2" noMargin>
            Start Your Journey with TutorCruncher
          </Heading>
          <p>
            Ready for your 2-week free trial? Create an account or get in touch.
          </p>
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
      </div>
    </div>
  </Body>
);
