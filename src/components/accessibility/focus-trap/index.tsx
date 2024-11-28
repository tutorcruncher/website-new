import { useEffect, useRef } from "react";

export const FocusTrap = ({ children }) => {
  const focusTrapRef = useRef(null);

  useEffect(() => {
    const focusableElementsString =
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const modal = focusTrapRef.current;
    const focusableElements = modal.querySelectorAll(focusableElementsString);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    modal.addEventListener("keydown", handleTabKey);

    return () => {
      modal.removeEventListener("keydown", handleTabKey);
    };
  }, []);

  return <div ref={focusTrapRef}>{children}</div>;
};
