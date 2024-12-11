"use client";
import type { ReactNode } from "react";

import { Body } from "../../ui/body";
import { Heading } from "../../ui/heading";
import styles from "./logos.module.scss";
import { PrismicNextImage } from "@prismicio/next";
import { ImageField } from "@prismicio/types";

interface LogosProps {
  heading: ReactNode;
  logos: ImageField[];
}

export const Logos = ({ heading, logos }: LogosProps) => {
  return (
    <Body
      background="blue"
      spacing="small"
      heading={
        <Heading variant="div" center>
          {heading}
        </Heading>
      }
    >
      <div className={styles.logos}>
        {logos.map((image, index) => (
          <PrismicNextImage
            field={image}
            key={index}
            className="animate"
            style={{ animationDelay: ` ${index * 0.2}s` }}
          />
        ))}
      </div>
    </Body>
  );
};
