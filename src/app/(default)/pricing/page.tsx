"use client";

import { getCountryPath } from "@/helpers/get-country-path";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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

        const country = getCountryPath(country_code) || "gb";

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
