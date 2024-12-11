import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import type { JSX } from "react";

import { FaqsList } from "@/components/features/faqs/faqs-list";
import { backgroundColor } from "@/helpers/backgroundColor";

/**
 * Props for `Faqs`.
 */
export type FaqsProps = SliceComponentProps<Content.FaqsSlice>;

/**
 * Component for "Faqs" Slices.
 */
const Faqs = async ({ slice }: FaqsProps): Promise<JSX.Element> => {
  const faqs = slice.primary.faqs;
  const background = backgroundColor(slice.primary.background_colour);
  const title = slice.primary.title || "Frequently Asked Questions";
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
      <FaqsList faqs={formattedFaqs} background={background} title={title} />
    </section>
  );
};

export default Faqs;
