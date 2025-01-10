// app/pricing-redirect/page.tsx
import { redirect } from "next/navigation";

async function fetchCountryCode() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HERMES_BASE_URL}/loc/`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch country code");
    }

    const { country_code }: { country_code: string } = await response.json();
    return country_code;
  } catch (error) {
    console.error("Error fetching country info:", error);
    return "gb";
  }
}

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

export default async function PricingRedirectPage() {
  const countryCode = await fetchCountryCode();
  const targetPath = `/pricing/${getCountryPath(countryCode)}`;

  redirect(targetPath);
}
