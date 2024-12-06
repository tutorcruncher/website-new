"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type TrackingContextType = {
  queryParams: Record<string, string>;
  updateQueryParams: (newParams: Record<string, string>) => void;
};

const TrackingContext = createContext<TrackingContextType | undefined>(
  undefined
);

export const useTracking = () => {
  const context = useContext(TrackingContext);
  if (!context) {
    throw new Error("useTracking must be used within a TrackingProvider");
  }
  return context;
};

export const TrackingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [queryParams, setQueryParams] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window?.location.search);

    const getTrackingParams = () => {
      let params: Record<string, string> = {};

      const tcSource =
        localStorage.getItem("_tc_source") ||
        urlParams.get("utm_source") ||
        "direct";
      if (tcSource) params.tc_source = tcSource;

      const tcCampaign =
        localStorage.getItem("_tc_campaign") ||
        urlParams.get("utm_campaign") ||
        "";
      if (tcCampaign) params.tc_campaign = tcCampaign;

      const bdr =
        localStorage.getItem("_bdr_person_id") || urlParams.get("bdr") || "";
      if (bdr) params.bdr = bdr;

      return params;
    };

    const params = getTrackingParams();

    if (params.tc_source) localStorage.setItem("_tc_source", params.tc_source);
    if (params.tc_campaign)
      localStorage.setItem("_tc_campaign", params.tc_campaign);
    if (params.bdr) localStorage.setItem("_bdr_person_id", params.bdr);

    setQueryParams(params);
  }, []);

  const updateQueryParams = (newParams: Record<string, string>) => {
    setQueryParams((prev) => ({ ...prev, ...newParams }));
  };

  return (
    <TrackingContext.Provider value={{ queryParams, updateQueryParams }}>
      {children}
    </TrackingContext.Provider>
  );
};
