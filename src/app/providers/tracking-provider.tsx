/* 
The following comment outlines the logic for setting the tracking parameters:
If someone comes from direct first, we assign tc_source to Direct and then overwrite it if they come from somewhere else
If utm_source is present, then the user must have come from an ad. tc_source is set to the utm_source and tc_campaign is set to utm_campaign. This is then never changed
If utm_source is not present, we set tc_source from the referrer unless tc_source has already been set as a cookie and tc_source is not Direct. tc_campaign should be set to tc-[page-type]-[page-title-slugified] which is based off of the landing page
*/

"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

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

const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getReferrerDomain = () => {
  try {
    const referrer = document.referrer;
    if (referrer) {
      const { hostname } = new URL(referrer);
      const parts = hostname.split(".");
      return parts.length >= 2 ? parts.slice(-2).join(".") : hostname;
    }
  } catch (e) {
    console.error("Referrer parsing error:", e);
  }
  return null;
};

const getPageInfo = () => {
  const path = window.location.pathname.split("/").filter(Boolean);
  const pageType = path[0] || "home";
  const title = document.title || "untitled";
  return `tc-${pageType}-${slugify(title)}`;
};

const getTrackingParams = (): Record<string, string> => {
  const params: Record<string, string> = {};
  if (typeof window === "undefined") return params;

  const urlParams = new URLSearchParams(window.location.search);
  const storedSource = localStorage.getItem("_tc_source") || null;
  const storedCampaign = localStorage.getItem("_tc_campaign") || null;

  const hasUTM = urlParams.has("utm_source");
  const utmSource = urlParams.get("utm_source");
  const utmCampaign = urlParams.get("utm_campaign");

  if (hasUTM && utmSource) {
    localStorage.setItem("_tc_source", utmSource);
    if (utmCampaign) localStorage.setItem("_tc_campaign", utmCampaign);

    params.tc_source = utmSource;
    if (utmCampaign) params.tc_campaign = utmCampaign;
    return params;
  }

  let source = storedSource;
  let campaign = storedCampaign;

  if (!source) {
    source = "Direct";
    localStorage.setItem("_tc_source", source);
  }

  if (source === "Direct") {
    const referrer = getReferrerDomain();
    if (referrer) {
      source = referrer;
      localStorage.setItem("_tc_source", source);
    }
  }

  if (!campaign || source === "Direct") {
    campaign = getPageInfo();
    localStorage.setItem("_tc_campaign", campaign);
  }

  params.tc_source = source;
  params.tc_campaign = campaign;

  return params;
};

export const TrackingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [queryParams, setQueryParams] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = getTrackingParams();
    setQueryParams(params);
  }, []);

  const updateQueryParams = useCallback((newParams: Record<string, string>) => {
    setQueryParams((prev) => ({ ...prev, ...newParams }));
  }, []);

  return (
    <TrackingContext.Provider value={{ queryParams, updateQueryParams }}>
      {children}
    </TrackingContext.Provider>
  );
};
