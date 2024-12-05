"use client";
import clsx from "clsx";

import { Body } from "@/components/ui/body";

import styles from "./features-list.module.scss";
import { FeaturesListProps } from "./types";
import { useRouter } from "next/navigation";
import { FeatureCard } from "./feature-card";

export const FeaturesList = ({ features }: FeaturesListProps) => {
  const router = useRouter();

  return (
    <>
      <Body>
        <div className={clsx(styles.cards, "animate-children")}>
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.listImage}
              intro={feature.listText}
              title={feature.title}
              onClick={() => router.push(feature.url)}
            />
          ))}
        </div>
      </Body>
    </>
  );
};
