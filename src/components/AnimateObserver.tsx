"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

export default function AnimateObserver() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const elements = document.querySelectorAll(".animate, .animate-children");

    elements.forEach((elm) => elm.classList.add("animate-enabled"));

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in-view");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      threshold: 0.2,
    });

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, [pathname]);

  return null;
}
