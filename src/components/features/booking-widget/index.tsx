"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Action } from "@/components/ui/action";
import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";

import styles from "./bookingWidget.module.scss";
import { HasBooked } from "./has-booked";
import { checkPreviousBookings } from "./helpers";
import { NeverBooked } from "./never-booked";
import { LoadingSvg } from "@/svgs/loading";

export const BookingWidget = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookingState, setBookingState] = useState<
    "has booked" | "never booked" | null
  >(null);
  const router = useRouter();

  useEffect(() => {
    const previousBooking = checkPreviousBookings();
    if (previousBooking) {
      router.push(previousBooking);
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <Body spacing="small" background="cream">
        <LoadingSvg />
      </Body>
    );
  }

  return (
    <Body spacing="small" background="cream">
      <div className={styles.container}>
        <Heading size="xsmall" noMargin>
          Have you spoken to <br />
          any of our sales team before?
        </Heading>
        <div className={styles.buttons}>
          <Action
            onClick={() => setBookingState("has booked")}
            variant={bookingState === "has booked" ? "solid" : "outline"}
            disableAnimation
          >
            Yes
          </Action>
          <Action
            onClick={() => setBookingState("never booked")}
            variant={bookingState === "never booked" ? "solid" : "outline"}
            disableAnimation
          >
            No/not sure
          </Action>
        </div>
        <div className={styles.content}>
          {bookingState === "never booked" ? <NeverBooked /> : null}
          {bookingState === "has booked" ? <HasBooked /> : null}
        </div>
      </div>
    </Body>
  );
};
