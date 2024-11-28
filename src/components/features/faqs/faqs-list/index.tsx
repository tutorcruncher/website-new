import { Heading } from "@/components/ui/heading";

import { Body } from "../../../ui/body";
import { Faq } from "../faq";
import { IFaqsProps } from "../types";
import styles from "./faqs-list.module.scss";

export const FaqsList = ({ faqs }: IFaqsProps) => {
  return (
    <Body
      containerSize="small"
      background="blue"
      heading={
        <Heading variant="h2" center>
          Frequently Asked Questions
        </Heading>
      }
    >
      <div className={styles.faqsList}>
        {faqs.map((faq) => (
          <Faq key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </Body>
  );
};
