"use client";
import Image from "next/image";
import type { ReactNode } from "react";

import { Body } from "../../ui/body";
import { Heading } from "../../ui/heading";
import styles from "./logos.module.scss";

interface LogosProps {
  heading: ReactNode;
  logos: any[];
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
          <Image
            key={index}
            width={image.width}
            height={image.height}
            src={image.url}
            alt={image.alt}
            className="animate"
            style={{ animationDelay: ` ${index * 0.2}s` }}
          />
        ))}
      </div>
    </Body>
  );
};
