import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

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
  gb: ["gb", "bg", "hr", "cz", "hu", "pl", "ro", "sw"], // European countries that don't have euro
  za: ["za"],
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

export async function handlePricingRedirect(request: NextRequest) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HERMES_BASE_URL}/loc/`
    );

    const { country_code }: { country_code: string } = await response.json();

    const country = getCountryPath(country_code);
    const targetPath = `${request.nextUrl.pathname}/${country}`;

    return NextResponse.redirect(new URL(targetPath, request.url));
  } catch (error) {
    console.error("Error fetching location:", error);
    return NextResponse.redirect(new URL("/pricing/gb", request.url));
  }
}
