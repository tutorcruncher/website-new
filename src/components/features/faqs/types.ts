import { BackgroundColour } from "@/types/backgroundColor";
import React from "react";

export interface IFaq {
  question: string;
  answer: React.ReactNode;
}

export interface IFaqsProps {
  faqs: IFaq[];
  background: BackgroundColour;
}
