import { COUNTRIES_CURRENCIES, LISTED_CURRENCIES } from "./constants";

export const getCurrencyOptions = (countryCode: string) => {
  let currencyStr = COUNTRIES_CURRENCIES[countryCode]?.currencies[0];
  if (!(currencyStr in LISTED_CURRENCIES)) {
    currencyStr = COUNTRIES_CURRENCIES["US"]["currencies"][0];
  }
  return LISTED_CURRENCIES[currencyStr];
};

export const getKeyByCurrencyCode = (currencyCode: string) => {
  for (const key in LISTED_CURRENCIES) {
    if (key.includes(currencyCode)) {
      return key;
    }
  }
  return null;
};

export const checkPreviousBookings = (): string | false => {
  const previousCallData = JSON.parse(localStorage.getItem("call_data"));

  if (!previousCallData || previousCallData.call_type !== "sales") {
    return false;
  }

  const {
    admin_id: salespersonId,
    name,
    email,
    company_name: companyName,
    website,
    phone,
    currency,
    price_plan: pricePlan,
  } = previousCallData;

  const currencyKey = getKeyByCurrencyCode(currency);

  if (!currencyKey) {
    console.error("Invalid currency code:", currency);
    return false;
  }

  const currencyData = LISTED_CURRENCIES[currencyKey];
  const rbIndex = currencyData.findIndex(([plan]) => plan === pricePlan);

  if (rbIndex === -1) {
    console.error("Revenue band not found for given currency and price plan.");
    return `/book-a-call/${salespersonId}/`;
  }

  return `/book-a-call/${salespersonId}/?rb=${rbIndex}&name=${name}&email=${email}&company=${companyName}&website=${website}&phone=${phone}`;
};
