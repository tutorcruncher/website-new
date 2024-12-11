import clsx from "clsx";
import type { ReactNode } from "react";

import styles from "./body.module.scss";
import { BackgroundColour } from "@/types/backgroundColor";

export interface BodyProps {
  children?: ReactNode;
  background?: BackgroundColour;
  spacing?: "none" | "small" | "medium" | "large";
  containerSize?: "small" | "medium" | "large" | "screenWidth";
  heading?: ReactNode;
}

export const Body = ({
  children,
  background,
  spacing = "medium",
  containerSize = "large",
  heading,
}: BodyProps) => {
  const backgroundClass = clsx({
    [styles.cream]: background === "cream",
    [styles.blue]: background === "blue",
  });

  const spacingClass = clsx({
    [styles.spacingNone]: spacing === "none",
    [styles.spacingSmall]: spacing === "small",
    [styles.spacingMedium]: spacing === "medium",
    [styles.spacingLarge]: spacing === "large",
  });

  const containerClass = clsx({
    [styles.containerSmall]: containerSize === "small",
    [styles.containerMedium]: containerSize === "medium",
    [styles.containerLarge]: containerSize === "large",
  });

  return (
    <section className={clsx(styles.wrapper, backgroundClass, spacingClass)}>
      <div className={clsx(styles.inner, containerClass)}>
        <div className={clsx(styles.headingWrapper, "animate")}>
          {heading ? heading : null}
        </div>
        {children ? children : null}
      </div>
    </section>
  );
};
