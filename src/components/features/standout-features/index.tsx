"use client";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";
import { Modal } from "@/components/ui/modal/modal";

import styles from "./standout-features.module.scss";
import { InfoCard } from "@/components/ui/info-card";
import { Feature, StandoutFeaturesProps } from "./types";
import { ArrowLink } from "@/components/ui/arrow-link";

export const StandoutFeatures = ({
  title,
  features,
}: StandoutFeaturesProps) => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const handleCardClick = (integration) => {
    setSelectedFeature(integration);
  };

  const closeModal = () => {
    setSelectedFeature(null);
  };
  return (
    <>
      <Body>
        <Heading variant="h2" className={styles.title} center>
          {title}
        </Heading>
        <div className={clsx(styles.cards, "animate-children")}>
          {features.map((integration) => (
            <InfoCard
              key={integration.title}
              title={integration.title}
              icon={integration.icon}
              intro={integration.intro}
              onClick={() => handleCardClick(integration)}
            />
          ))}
        </div>
        <div className="animate">
          <ArrowLink text="Link to all features" href="/" />
        </div>
      </Body>
      {selectedFeature ? (
        <Modal isOpen={true} onClose={closeModal}>
          <div className={styles.modal}>
            <Image
              src={selectedFeature.icon.url}
              width={selectedFeature.icon.width}
              height={selectedFeature.icon.height}
              alt={selectedFeature.icon.alt}
              className={styles.icon}
            />
            <Heading size="small" variant="h2" noMargin>
              {selectedFeature.title}
            </Heading>
            <div>{selectedFeature.content}</div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};
