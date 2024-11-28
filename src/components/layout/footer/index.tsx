import Link from "next/link";

import { Action } from "@/components/ui/action";
import LogoSvg from "@/svgs/logo";

import { Accordion } from "./accordion";
import styles from "./footer.module.scss";
import { FooterSocialLinks } from "./social-links";

export const Footer = async () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerContent}>
          <div className={styles.logo}>
            <LogoSvg />
            <p className={styles.tagLine}>
              The most comprehensive software for tutoring companies
            </p>
          </div>
          <div className={styles.links}>
            <Accordion title="Solutions">
              <Link href="/tutor-cruncher-starter">Pay as you Go</Link>
              <Link href="/tutor-cruncher-pro">Startup</Link>
              <Link href="/tutor-cruncher-enterprise">Enterprise</Link>
            </Accordion>
            <Accordion title="Newsletter">
              <p>[]</p>
            </Accordion>
            <Accordion title="About us">
              <Link href="/about">About</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/reviews">Reviews</Link>
              <Link href="/careers">Careers</Link>
              <Link href="/pricing">Pricing</Link>
            </Accordion>
            <Accordion title="Support">
              <Link href="/contact">Contact</Link>
              <Link href="/changes">Change log</Link>
              <Link href="https://help.tutorcruncher.com/en/" target="_blank">
                Help centre
              </Link>
            </Accordion>
          </div>
          <div className={styles.book}>
            <Action href="/book-a-call">Book a call</Action>
          </div>
          <div className={styles.socialLinks}>
            <FooterSocialLinks />
          </div>
          <div className={styles.legalLinks}>
            <Link href="https://tutorcruncher.com/api/" target="_blank">
              API Documentation
            </Link>
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="#">Cookies</Link>
          </div>
        </div>
        <div className={styles.end}>
          <p>
            © All rights reserved {new Date().getFullYear()}. TutorCruncher™
            and the TutorCruncher dinosaur logo are trademarks of TutorCruncher
            Limited (Company number 08385970) and may not be used or reproduced
            without consent of the owner.
          </p>
        </div>
      </div>
    </footer>
  );
};
