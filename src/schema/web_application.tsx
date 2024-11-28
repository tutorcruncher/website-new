export const webApplicationSchema = {
  "@context": "http://schema.org",
  "@type": "WebApplication",
  applicationCategory: "Tutoring Management",
  name: "Tutoring software,tutor management software,online tutoring software",
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
    lowPrice: "25",
    offerCount: "3",
    priceCurrency: "GBP",
    priceSpecification: [
      {
        "@type": "UnitPriceSpecification",
        price: "25",
        priceCurrency: "GBP",
        name: "Pay as you go",
      },
      {
        "@type": "UnitPriceSpecification",
        price: "60",
        priceCurrency: "GBP",
        name: "Startup",
      },
      {
        "@type": "UnitPriceSpecification",
        price: "2000",
        priceCurrency: "GBP",
        name: "Enterprise",
      },
    ],
  },
};
