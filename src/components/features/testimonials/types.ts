import type { ReactNode } from "react";

export interface ITestimonialProps {
  testimonial: ReactNode;
  shortTestimonial: string;
  reviewerImage?: {
    url: string;
    alt?: string;
    width: number;
    height: number;
  };
  companyLogo?: {
    url: string;
    alt?: string;
    width: number;
    height: number;
  };
  companyName: string;
  reviewerName: string;
  reviewerRole: string;
}

export interface ITestimonialsProps {
  heading: ReactNode;
  testimonials: ITestimonialProps[];
}
