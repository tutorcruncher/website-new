import { Heading } from "@/components/ui/heading";

import styles from "./testimonials-list.module.scss";

export const TestimonialList = ({ testimonials }) => {
  return (
    <div className={styles.testimonialsList}>
      {testimonials.map((review) => (
        <div className={styles.testimonial} key={review.id}>
          <Heading size="xsmall" variant="h3">
            {review.reviewerName} - {review.reviewerRole}
          </Heading>
          <div className="main-content">{review.testimonial}</div>
        </div>
      ))}
    </div>
  );
};
