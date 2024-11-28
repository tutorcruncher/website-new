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
        <LoadingSpinner />
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

const LoadingSpinner = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    width={50}
    height={50}
    style={{ margin: "20px auto", display: "block" }}
  >
    <radialGradient
      id="a"
      cx={0.66}
      cy={0.313}
      fx={0.66}
      fy={0.313}
      gradientTransform="scale(1.5)"
    >
      <stop offset={0} stopColor="#120EFF" />
      <stop offset={0.3} stopColor="#120EFF" stopOpacity={0.9} />
      <stop offset={0.6} stopColor="#120EFF" stopOpacity={0.6} />
      <stop offset={0.8} stopColor="#120EFF" stopOpacity={0.3} />
      <stop offset={1} stopColor="#120EFF" stopOpacity={0} />
    </radialGradient>
    <circle
      cx={100}
      cy={100}
      r={70}
      fill="none"
      stroke="url(#a)"
      strokeDasharray="200 1000"
      strokeLinecap="round"
      strokeWidth={15}
      transform-origin="center"
    >
      <animateTransform
        attributeName="transform"
        calcMode="spline"
        dur={2}
        keySplines="0 0 1 1"
        keyTimes="0;1"
        repeatCount="indefinite"
        type="rotate"
        values="360;0"
      />
    </circle>
    <circle
      cx={100}
      cy={100}
      r={70}
      fill="none"
      stroke="#120EFF"
      strokeLinecap="round"
      strokeWidth={15}
      opacity={0.2}
      transform-origin="center"
    />
  </svg>
);
