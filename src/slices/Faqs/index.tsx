import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import type { JSX } from "react";

import { FaqsList } from "@/components/features/faqs/faqs-list";

/**
 * Props for `Faqs`.
 */
export type FaqsProps = SliceComponentProps<Content.FaqsSlice>;

/**
 * Component for "Faqs" Slices.
 */
const Faqs = async ({ slice }: FaqsProps): Promise<JSX.Element> => {
  const faqs = slice.primary.faqs;

  const formattedFaqs = faqs.map((faq) => {
    return {
      question: faq.question,
      answer: <PrismicRichText field={faq.answer} />,
    };
  });

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <FaqsList faqs={formattedFaqs} />
    </section>
  );
};

export default Faqs;
