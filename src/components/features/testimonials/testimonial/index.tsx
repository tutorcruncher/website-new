import Image from "next/image";

import styles from "./testimonial.module.scss";

export const Testimonial = ({
  shortTestimonial,
  reviewerImage,
  companyLogo,
  reviewerName,
  reviewerRole,
}) => {
  return (
    <div className={styles.slide}>
      <div className={styles.logo}>
        <Image
          src={companyLogo.url}
          alt={companyLogo.alt || "logo"}
          width={companyLogo.width}
          height={companyLogo.height}
        />
      </div>
      <div className={styles.testimonial}>"{shortTestimonial}"</div>
      <div className={styles.cite}>
        <Image
          src={reviewerImage.url}
          alt={reviewerImage.alt || "photo of author"}
          width={reviewerImage.width}
          height={reviewerImage.height}
        />
        <p className={styles.name}>{reviewerName}</p>
        <p className={styles.role}>{reviewerRole}</p>
      </div>
    </div>
  );
};