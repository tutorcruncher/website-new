const generateWebAppSchema = (region) => {
  return {
    "@context": "http://schema.org",
    "@type": "WebApplication",
    applicationCategory: "Tutoring Management",
    name: "Tutoring software,tutor management software,online tutoring software",
    operatingSystem: "all",
    browserRequirements: "Requires Javascript and HTML5 support",
    url: "https://tutorcruncher.com/",
    screenshot: "https://tutorcruncher.com//assets/dashboard-screenshot.webp",
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
      lowPrice: region.pricing.payg.base_price,
      offerCount: "3",
      priceCurrency: region.currency_code,
      priceSpecification: [
        {
          "@type": "UnitPriceSpecification",
          price: region.pricing.payg.base_price,
          priceCurrency: region.currency_code,
          name: "Pay as you go",
        },
        {
          "@type": "UnitPriceSpecification",
          price: region.pricing.startup.base_price,
          priceCurrency: region.currency_code,
          name: "Startup",
        },
        {
          "@type": "UnitPriceSpecification",
          price: "2000",
          priceCurrency: region.currency_code,
          name: "Enterprise",
        },
      ],
    },
  };
};

export default generateWebAppSchema;
