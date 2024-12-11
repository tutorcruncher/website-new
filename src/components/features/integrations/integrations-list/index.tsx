"use client";
import clsx from "clsx";
import { useState } from "react";

import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";
import { Modal } from "@/components/ui/modal/modal";

import { groupIntegrationsByCategory } from "../helpers";
import { Integration, IntegrationsProps } from "../types";
import styles from "./integrations-list.module.scss";
import { InfoCard } from "@/components/ui/info-card";
import { PrismicNextImage } from "@prismicio/next";

export const IntegrationsList = ({ integrations }: IntegrationsProps) => {
  const groupedIntegrations = groupIntegrationsByCategory(integrations);
  const [selectedIntegration, setSelectedIntegration] =
    useState<Integration | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (integration) => {
    setSelectedIntegration(integration);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIntegration(null);
  };
  return (
    <>
      <Body>
        {Object.keys(groupedIntegrations).map((categoryTitle) => (
          <div key={categoryTitle} className={styles.integrationGroup}>
            <Heading variant="h2" className={styles.title}>
              {categoryTitle}
            </Heading>
            <div className={clsx(styles.cards, "animate-children")}>
              {groupedIntegrations[categoryTitle].map((integration) => (
                <InfoCard
                  key={integration.title}
                  title={integration.title}
                  icon={integration.logo}
                  intro={integration.intro}
                  onClick={() => handleCardClick(integration)}
                />
              ))}
            </div>
          </div>
        ))}
      </Body>
      {isModalOpen ? (
        <Modal isOpen={true} onClose={closeModal}>
          {selectedIntegration && (
            <div className={styles.integrationModal}>
              <PrismicNextImage
                field={selectedIntegration.logo}
                className={styles.logo}
              />

              <Heading size="small" variant="h2" noMargin>
                {selectedIntegration.title}
              </Heading>
              <div>{selectedIntegration.content}</div>
              {selectedIntegration?.screenshot ? (
                <PrismicNextImage
                  field={selectedIntegration.screenshot}
                  className={styles.screenshot}
                />
              ) : null}
            </div>
          )}
        </Modal>
      ) : null}
    </>
  );
};
