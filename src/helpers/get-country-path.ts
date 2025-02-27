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

export const getCountryPath = (country: string) => {
  for (const [pricingPath, countries] of Object.entries(countryToPricingMap)) {
    if (countries.includes(country.toLowerCase())) {
      return pricingPath;
    }
  }
};
