import { Heading } from "@/components/ui/heading";

import { Body } from "../../../ui/body";
import { Faq } from "../faq";
import { IFaqsProps } from "../types";
import styles from "./faqs-list.module.scss";

export const FaqsList = ({ title, faqs, background }: IFaqsProps) => {
  return (
    <Body
      containerSize="small"
      background={background}
      heading={
        <Heading variant="h2" center>
          {title}
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
