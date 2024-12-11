"use client";

import { Action } from "@/components/ui/action";
import { Heading } from "@/components/ui/heading";
import styles from "./newsletter.module.scss";
import { useNewsletterSubscription } from "hooks/use-newsletter-subscription";

export const Newsletter = () => {
  const { isLoading, isSubmitted, errorMessage, subscribe } =
    useNewsletterSubscription();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    await subscribe(email);
  };

  return (
    <div className={styles.newsletter}>
      <Heading size="xsmall" variant="h2" noMargin>
        Don’t miss out!
      </Heading>
      <p>
        Sign up to our mailing list to receive all the exciting updates and
        insights!
      </p>
      <form onSubmit={handleSubscribe}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          disabled={isLoading || isSubmitted}
          className={styles.input}
        />
        {isSubmitted ? (
          <p className={styles.successMessage}>Thank you for subscribing!</p>
        ) : (
          <Action
            disabled={isLoading}
            disableAnimation
            type="submit"
            loading={isLoading}
          >
            Subscribe
          </Action>
        )}
      </form>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};
