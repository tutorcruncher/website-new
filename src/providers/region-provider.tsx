"use client";

import { regions } from "app/data/regions/regions";
import React, { createContext, useContext, useEffect, useState } from "react";

type RegionContextType = {
  region: (typeof regions)[0] | null;
  countryCode: string | null;
};

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export const useRegion = () => {
  const context = useContext(RegionContext);
  if (!context) {
    throw new Error("useRegion must be used within RegionProvider");
  }
  return context;
};

export const RegionProvider = ({ children }: { children: React.ReactNode }) => {
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [region, setRegion] = useState<(typeof regions)[0] | null>(null);

  useEffect(() => {
    const fetchRegion = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HERMES_BASE_URL}/loc/`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const { country_code } = await response.json();
        setCountryCode(country_code);
        const fetchedRegion = regions.find(
          (region) => region.region_code === country_code.toLowerCase()
        );
        setRegion(fetchedRegion || null);
      } catch (err) {
        console.error("Failed to fetch region:", err);
      }
    };

    fetchRegion();
  }, []);

  return (
    <RegionContext.Provider value={{ region, countryCode }}>
      {children}
    </RegionContext.Provider>
  );
};
