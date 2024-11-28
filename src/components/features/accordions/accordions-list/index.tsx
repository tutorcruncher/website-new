"use client";
import clsx from "clsx";
import { useState } from "react";

import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";

import { Accordion } from "../accordion";
import { IAccordionsProps } from "../types";
import styles from "./accordions-list.module.scss";

export const AccordionsList = ({
  heading,
  backgroundColour,
  items,
}: IAccordionsProps) => {
  const [expandedId, setExpandedId] = useState(0);

  return (
    <Body
      background={backgroundColour}
      spacing="medium"
      heading={
        <Heading variant="div" size="xlarge" center>
          {heading}
        </Heading>
      }
    >
      <div className={clsx(styles.inner, "animate")}>
        <div className={styles.imageHolder}></div>
        <div className={styles.accordionsWrapper}>
          {items.map((item, index) => (
            <Accordion
              index={index}
              key={index}
              heading={item.heading}
              content={item.content}
              image={item.image}
              onClick={() => setExpandedId(index)}
              isExpanded={index === expandedId}
            />
          ))}
        </div>
      </div>
    </Body>
  );
};
