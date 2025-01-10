"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const countryToPricingMap = {
  au: ["au"],
  ca: ["ca"],
  eu: [
    "at",
    "be",
    "cy",
    "ee",
    "fi",
    "fr",
    "de",
    "gr",
    "ie",
    "it",
    "lv",
    "lt",
    "lu",
    "mt",
    "nl",
    "pt",
    "sk",
    "sl",
    "es",
  ],
  gb: ["gb", "bg", "hr", "cz", "hu", "pl", "ro", "sw"],
  us: ["us"],
};

const getCountryPath = (country: string) => {
  for (const [pricingPath, countries] of Object.entries(countryToPricingMap)) {
    if (countries.includes(country.toLowerCase())) {
      return pricingPath;
    }
  }
  return "gb";
};

const PricingRedirectPage = () => {
  const router = useRouter();
  useEffect(() => {
    const redirectToPricing = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HERMES_BASE_URL}/loc/`
        );

        const { country_code }: { country_code: string } =
          await response.json();

        const country = getCountryPath(country_code);

        const targetPath = `pricing/${country}`;
        router.push(targetPath);
      } catch (error) {
        console.error("Error fetching country info:", error);
        router.push("/pricing/gb");
      }
    };

    redirectToPricing();
  }, [router]);

  return null;
};

export default PricingRedirectPage;
