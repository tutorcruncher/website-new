import { ImageField } from "@prismicio/types";
import React from "react";

export interface AlternatingGridItem {
  heading: string;
  content: React.ReactNode;
  image?: ImageField;
  imagePosition?: "Left" | "Right";
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
