"use client";

import { Action } from "@/components/ui/action";
import { Body } from "@/components/ui/body";

import styles from "./contact-form.module.scss";
import { Form } from "./form";

export const ContactForm = ({ content }) => {
  return (
    <Body background="cream" containerSize="medium">
      <div className={styles.contactWrapper}>
        <div className={styles.call}>
          <div className="main-content">{content}</div>
          <Action href="/book-a-call">Book a call</Action>
        </div>
        <Form />
      </div>
    </Body>
  );
};
