import { Heading } from "@/components/ui/heading";
import Image from "next/image";

import styles from "./testimonials-list.module.scss";

export const TestimonialList = ({ testimonials }) => {
  return (
    <div className={styles.testimonialsList}>
      {testimonials.map(
        ({
          companyLogo,
          id,
          reviewerName,
          reviewerRole,
          testimonial,
          companyName,
        }) => (
          <div className={styles.testimonial} key={id}>
            <div className="main-content">{testimonial}</div>
            <div className={styles.cite}>
              <Image
                src={companyLogo.url}
                alt={companyLogo.alt || "logo"}
                width={companyLogo.width}
                height={companyLogo.height}
              />
              <div>
                <Heading size="xxsmall" variant="h3" noMargin>
                  {reviewerName}
                </Heading>
                <p>
                  {reviewerRole} - {companyName}
                </p>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
