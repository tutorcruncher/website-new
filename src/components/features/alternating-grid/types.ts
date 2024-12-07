import React from "react";
import { ImageField } from "@prismicio/client";

export interface AlternatingGridItem {
  heading: string;
  content: React.ReactNode;
  image?: ImageField;
  imagePosition?: "Right" | "Left";
  button?: {
    text: string;
    link: string;
    target?: string;
  };
  variation?: "default" | "withBackground";
  className?: string;
}

export interface AlternatingGridProps {
  heading: React.ReactNode;
  backgroundColour: "cream" | "blue";
  variation?: "default" | "withBackground";
  items: AlternatingGridItem[];
  className?: string;
}
