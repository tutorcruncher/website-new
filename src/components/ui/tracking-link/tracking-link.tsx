"use client";
import React from "react";
import { Action } from "../action";
import { useTracking } from "app/providers/tracking-provider";
import { ActionVariants } from "../action/types";

interface TrackingLinkProps {
  url: string;
  text: string;
  variant?: ActionVariants;
}

const TrackingLink = ({
  url,
  text,
  variant = "outline",
}: TrackingLinkProps) => {
  const { queryParams } = useTracking();

  if (typeof window === "undefined") {
    return (
      <Action href={url.toString()} variant={variant}>
        {text}
      </Action>
    );
  }

  const trackingUrl = new URL(url, window?.location.origin);
  Object.entries(queryParams).forEach(([key, value]) => {
    return trackingUrl.searchParams.set(key, String(value));
  });

  return (
    <Action href={trackingUrl.toString()} variant={variant}>
      {text}
    </Action>
  );
};

export default TrackingLink;
