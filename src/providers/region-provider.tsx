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
    const getCountryCodeFromStorage = (): string | null => {
      return localStorage.getItem("countryCode");
    };

    const setCountryCodeInStorage = (code: string) => {
      localStorage.setItem("countryCode", code);
    };

    const fetchRegion = async () => {
      try {
        const storedCode = getCountryCodeFromStorage();
        if (storedCode) {
          setRegionFromCode(storedCode);
        } else {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_HERMES_BASE_URL}/loc/`
          );

          if (response.ok) {
            const { country_code } = await response.json();
            setCountryCodeInStorage(country_code);
            setRegionFromCode(country_code);
          } else {
            setFallbackRegion();
          }
        }
      } catch (err) {
        setFallbackRegion();
      }
    };

    const setRegionFromCode = (code: string) => {
      setCountryCode(code);
      const matchedRegion = regions.find(
        (region) => region.region_code === code.toLowerCase()
      );
      setRegion(matchedRegion || null);
    };

    const setFallbackRegion = () => {
      const fallbackCode = "GB";
      setCountryCodeInStorage(fallbackCode);
      setRegionFromCode(fallbackCode);
    };

    fetchRegion();
  }, []);

  return (
    <RegionContext.Provider value={{ region, countryCode }}>
      {children}
    </RegionContext.Provider>
  );
};
