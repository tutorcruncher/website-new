export async function getMsgBirdData() {
  const smsUrl = "https://rest.messagebird.com/pricing/sms/outbound";

  const response = await fetch(smsUrl, {
    method: "GET",
    headers: {
      Authorization: `AccessKey ${process.env.MSGBIRD_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Error fetching message bird data. Status: ${response.status}`
    );
  }

  const pricingData = await response.json();

  // The API returns a "default" (non-listed) rate as the first entry.
  // We remove it by slicing the array from index 1 onward.
  return pricingData.prices.slice(1);
}

export async function getUsdForex() {
  const rateKey = process.env.RATE_KEY;

  const ratesUrl = `https://openexchangerates.org/api/latest.json?app_id=${rateKey}&base=USD&symbols=GBP`;

  const response = await fetch(ratesUrl);
  if (!response.ok) {
    throw new Error(`Error fetching forex data. Status: ${response.status}`);
  }

  const data = await response.json();
  const { GBP } = data.rates;

  return 1 / GBP;
}

const COST_MULTIPLIER = 2;
const PRIORITY = [
  "South Africa",
  "Australia",
  "United Kingdom",
  "Canada",
  "United States of America",
];

function groupByContiguous(sortedArray, keyGetter) {
  const groups = [];
  let i = 0;

  while (i < sortedArray.length) {
    const groupKey = keyGetter(sortedArray[i]);
    const groupItems = [];

    while (i < sortedArray.length && keyGetter(sortedArray[i]) === groupKey) {
      groupItems.push(sortedArray[i]);
      i++;
    }
    groups.push([groupKey, groupItems]);
  }

  return groups;
}

function priceFormatter(minPrice, maxPrice) {
  const formattedMin = minPrice.toFixed(3);
  const formattedMax = maxPrice.toFixed(3);

  return minPrice === maxPrice
    ? formattedMin
    : `${formattedMin} - ${formattedMax}`;
}

export async function getSmsPricing() {
  const pricingData = await getMsgBirdData();
  const usdConvRate = await getUsdForex();

  pricingData.sort((a, b) => a.countryName.localeCompare(b.countryName));

  const grouped = groupByContiguous(pricingData, (item) => item.countryName);

  const smsData = [];

  for (const [country, countryPrices] of grouped) {
    const costs = countryPrices.map((priceObj) => parseFloat(priceObj.price));
    const maxPrice = Math.max(...costs);
    const minPrice = Math.min(...costs);

    const countryData = {
      country: country,
      messagebird_cost_gbp: priceFormatter(minPrice, maxPrice),
      gbp_price: priceFormatter(
        minPrice * COST_MULTIPLIER,
        maxPrice * COST_MULTIPLIER
      ),
      usd_price: priceFormatter(
        minPrice * COST_MULTIPLIER * usdConvRate,
        maxPrice * COST_MULTIPLIER * usdConvRate
      ),
      is_range: maxPrice !== minPrice,
      priority: PRIORITY.includes(country) ? PRIORITY.indexOf(country) : -1,
    };
    smsData.push(countryData);
  }

  return smsData.sort((a, b) => a.country.localeCompare(b.country));
}
