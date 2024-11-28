import Image from "next/image";

import { Action } from "../../ui/action";
import { Heading } from "../../ui/heading";
import styles from "./home-page-hero.module.scss";

export const HomePageHero = ({ heading, intro }) => {
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
            <Action href="https://secure.tutorcruncher.com" variant="outline">
              Start a free trial
            </Action>
          </div>
        </div>
        <div className={styles.animations}>
          <div className={styles.imageOne}>
            <Image
              src={"/img/home/hero-image-one.svg"}
              width={233}
              height={134}
              alt=""
            />
          </div>
          <div className={styles.imageTwo}>
            <Image
              src={"/img/home/hero-image-two.png"}
              width={150}
              height={213}
              alt=""
            />
          </div>
          <div className={styles.imageThree}>
            <Image
              src={"/img/home/hero-image-three.png"}
              width={136}
              height={151}
              alt=""
            />
          </div>
          <div className={styles.imageFour}>
            <Image
              src={"/img/home/hero-image-four.svg"}
              width={215}
              height={171}
              alt=""
            />
          </div>
          <div className={styles.imageWrapper}>
            <Image
              src={"/img/home/home-hero-placeholder.jpg"}
              width={396}
              height={494}
              alt=""
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};
