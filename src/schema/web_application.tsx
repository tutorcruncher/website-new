"use client";
import { useRegion } from "@/providers/region-provider";
import Script from "next/script";

export const WebApplicationSchema = () => {
  const { region } = useRegion();

  if (!region) return null;

  const schema = {
    "@context": "http://schema.org",
    "@type": "WebApplication",
    applicationCategory: "Tutoring Management",
    name: "Tutoring software, tutor management software, online tutoring software",
    operatingSystem: "all",
    browserRequirements: "Requires Javascript and HTML5 support",
    url: "https://tutorcruncher.com/",
    screenshot: "https://tutorcruncher.com/assets/dashboard-screenshot.webp",
    creator: {
      "@id": "https://tutorcruncher.com/#organisation",
    },
    sourceOrganization: {
      "@type": "Organization",
      "@id": "https://tutorcruncher.com/#organisation",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "575",
      reviewCount: "373",
    },
    offers: {
      "@type": "AggregateOffer",
      offeredBy: {
        "@id": "https://tutorcruncher.com/#organisation",
      },
      highPrice: "2000",
      lowPrice: region.pricing?.payg?.base_price || "0",
      offerCount: "3",
      priceCurrency: region.currency_code || "USD",
      priceSpecification: [
        {
          "@type": "UnitPriceSpecification",
          price: region.pricing?.payg?.base_price || "0",
          priceCurrency: region.currency_code || "USD",
          name: "Pay as you go",
        },
        {
          "@type": "UnitPriceSpecification",
          price: region.pricing?.startup?.base_price || "0",
          priceCurrency: region.currency_code || "USD",
          name: "Startup",
        },
        {
          "@type": "UnitPriceSpecification",
          price: "2000",
          priceCurrency: region.currency_code || "USD",
          name: "Enterprise",
        },
      ],
    },
  };

  console.log("Generated schema:", JSON.stringify(schema, null, 2));

  return (
    <Script
      id="web-application-schema"
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(schema)}
    </Script>
  );
};
