import { useState } from "react";

export const useNewsletterSubscription = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const subscribe = async (email) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        "https://intercom.tutorcruncher.com/blog-callback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      setIsSubmitted(true);
    } catch (error) {
      setErrorMessage("Sorry, something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isSubmitted, errorMessage, subscribe };
};
