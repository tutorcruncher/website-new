"use client";
import clsx from "clsx";

import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";

import styles from "./features-list.module.scss";
import { InfoCard } from "@/components/ui/info-card";
import { FeaturesListProps } from "./types";
import { useRouter } from "next/navigation";

export const FeaturesList = ({ features }: FeaturesListProps) => {
  const router = useRouter();

  return (
    <>
      <Body>
        <div className={clsx(styles.cards, "animate-children")}>
          {features.map((feature) => (
            <InfoCard
              key={feature.title}
              icon={feature.listImage}
              intro={feature.listText}
              title={feature.title}
              onClick={() => router.push(feature.url)}
              fullWidth
            />
          ))}
        </div>
      </Body>
    </>
  );
};
