"use client";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";
import { Modal } from "@/components/ui/modal/modal";

import { groupByCategory } from "./helpers";
import styles from "./optional-extras-list.module.scss";
import { InfoCard } from "@/components/ui/info-card";
import { OptionalExtra } from "./types";

export const OptionalExtrasList = ({ optionalExtras }) => {
  const groupedOptionalExtras = groupByCategory(optionalExtras);
  const [selectedOptionalExtra, setSelectedOptionalExtra] =
    useState<OptionalExtra | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (optionalExtra: OptionalExtra) => {
    setSelectedOptionalExtra(optionalExtra);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOptionalExtra(null);
  };

  console.log(groupedOptionalExtras);

  return (
    <>
      <Body background="cream">
        {Object.keys(groupedOptionalExtras).map((categoryTitle) => (
          <div key={categoryTitle} className={styles.integrationGroup}>
            <Heading variant="h2" className={styles.title}>
              {categoryTitle}
            </Heading>
            <div className={clsx(styles.cards, "animate-children")}>
              {groupedOptionalExtras[categoryTitle].map((optionalExtra) => (
                <InfoCard
                  key={optionalExtra.title}
                  title={optionalExtra.title}
                  icon={optionalExtra.image}
                  onClick={() => handleCardClick(optionalExtra)}
                  variant="feature"
                />
              ))}
            </div>
          </div>
        ))}
      </Body>
      {isModalOpen ? (
        <Modal isOpen={true} onClose={closeModal}>
          {selectedOptionalExtra && (
            <div className={styles.integrationModal}>
              <Heading size="small" variant="h2" noMargin>
                {selectedOptionalExtra.title}
              </Heading>
              <div>{selectedOptionalExtra.content}</div>
            </div>
          )}
        </Modal>
      ) : null}
    </>
  );
};
