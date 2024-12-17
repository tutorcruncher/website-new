"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnimateObserver() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false); // Tracks if component has hydrated

  useEffect(() => {
    setIsClient(true); // Runs only on the client-side
  }, []);

  useEffect(() => {
    if (!isClient) return; // Skip logic until client-side

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
  }, [pathname, isClient]);

  return null;
}
