import { Body } from "@/components/ui/body";

import styles from "./alternating-grid.module.scss";
import { TextImageGridItem } from "./alternating-grid-item";
import { AlternatingGridProps } from "./types";

export const AlternatingGrid = ({
  heading,
  backgroundColour,
  items,
  variation = "default",
}: AlternatingGridProps) => {
  return (
    <Body background={backgroundColour} spacing="large" heading={heading}>
      <div className={styles.inner}>
        {items.map((item) => (
          <TextImageGridItem
            key={item.heading}
            heading={item.heading}
            content={item.content}
            variation={variation}
            imagePosition={item.imagePosition}
            button={item.button}
            image={item.image}
          />
        ))}
      </div>
    </Body>
  );
};
