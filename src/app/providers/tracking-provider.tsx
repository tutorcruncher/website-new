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

// Google Click ID (GCLID) storage helpers (90-day expiry)
// Use consistent key "_tc_gclid" and ISO datetime expiry
const GCLID_KEY = "_tc_gclid";
const GCLID_EXPIRY_MS = 90 * 24 * 60 * 60 * 1000;

const storeGclid = (value: string): {gclid: string, expiryDate: string} => {
    const expiryIso = new Date(Date.now() + GCLID_EXPIRY_MS).toISOString();
    const record = { gclid: value, expiryDate: expiryIso };
    localStorage.setItem(GCLID_KEY, JSON.stringify(record));
    return record;
};

const getTrackingParams = (): Record<string, string> => {
  const params: Record<string, string> = {};
  if (typeof window === "undefined") return params;

  const urlParams = new URLSearchParams(window.location.search);
  const storedSource = localStorage.getItem("_tc_source") || null;
  const storedCampaign = localStorage.getItem("_tc_campaign") || null;

  // Capture and persist Google Click ID (GCLID) with 90-day expiry
  // Google documentation suggests validating gclsrc contains "aw" (e.g. aw.ds)
  // to ensure the GCLID comes from Google Ads before storing/using it.
  const gclidParam = urlParams.get("gclid");
  const gclsrcParam = urlParams.get("gclsrc");
  const isGclsrcValid = !gclsrcParam || gclsrcParam.includes("aw");
  if (gclidParam && isGclsrcValid) {
    const {gclid, expiryDate} = storeGclid(gclidParam);
    if (gclid) {
      params.gclid = gclid;
      params.gclid_expiry_dt = expiryDate;
    }
  } else {
    try {
      const raw = localStorage.getItem(GCLID_KEY);
      if (raw) {
        const record = JSON.parse(raw) as { gclid: string; expiryDate: string };
        const expiryMs = new Date(record.expiryDate).getTime();
        if (Number.isFinite(expiryMs) && Date.now() < expiryMs) {
          params.gclid = record.gclid;
          params.gclid_expiry_dt = record.expiryDate;
        }
      }
      } catch {
        // ignore parse/storage errors
      }
  }

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
