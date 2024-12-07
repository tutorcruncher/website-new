import { Image } from "@/components/ui/image";

import { Action } from "../../ui/action";
import { Heading } from "../../ui/heading";
import styles from "./home-page-hero.module.scss";
import TrackingLink from "@/components/ui/tracking-link/tracking-link";

export const HomePageHero = ({ heading, intro, heroImages }) => {
  return (
    <div className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <Heading size="large" variant="div" noMargin>
            {heading}
          </Heading>
          <p className={styles.tagLine}>{intro}</p>
          <div className={styles.buttons}>
            <Action href="/book-a-call">Book a call</Action>
            <TrackingLink
              url="https://secure.tutorcruncher.com/start/1/"
              text="Start a free trial"
            />
          </div>
        </div>
        <div className={styles.animations}>
          <div className={styles.imageOne}>
            <Image image={heroImages[1].image} unoptimized />
          </div>
          <div className={styles.imageTwo}>
            <Image image={heroImages[2].image} unoptimized />
          </div>
          <div className={styles.imageThree}>
            <Image image={heroImages[3].image} unoptimized />
          </div>
          <div className={styles.imageFour}>
            <Image image={heroImages[4].image} unoptimized />
          </div>
          <div className={styles.imageWrapper}>
            <Image image={heroImages[0].image} />
          </div>
        </div>
      </div>
    </div>
  );
};
