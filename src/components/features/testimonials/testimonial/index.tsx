import styles from "./testimonial.module.scss";
import { PrismicNextImage } from "@prismicio/next";

export const Testimonial = ({
  shortTestimonial,
  reviewerImage,
  companyLogo,
  reviewerName,
  companyName,
  reviewerRole,
}) => {
  return (
    <div className={styles.slide}>
      <div className={styles.logo}>
        <PrismicNextImage field={companyLogo} />
      </div>
      <div className={styles.testimonial}>&#34;{shortTestimonial}&#34;</div>
      <div className={styles.cite}>
        <PrismicNextImage field={reviewerImage} />
        <div className={styles.info}>
          <p className={styles.name}>{reviewerName}</p>
          <p className={styles.role}>
            {reviewerRole}, {companyName}
          </p>
        </div>
      </div>
    </div>
  );
};
