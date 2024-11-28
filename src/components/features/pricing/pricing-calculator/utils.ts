export const calculateGBFees = (
  revenue: number,
  onlinePercent: number,
  prices
) => {
  const onlineAmount = Number(
    (
      revenue *
      (prices.online_percentage / 100) *
      (onlinePercent / 100)
    ).toFixed(2)
  );
  const offlineAmount = Number(
    (
      revenue *
      (prices.offline_percentage / 100) *
      (1 - onlinePercent / 100)
    ).toFixed(2)
  );
  const totalAmount = Number(
    prices.base_price + onlineAmount + offlineAmount
  ).toFixed(2);

  return { onlineAmount, offlineAmount, totalAmount };
};

export const calculateFees = (revenue: number, prices) => {
  const revenuePercentage = Number(
    (revenue * (prices.revenue_percentage / 100)).toFixed(2)
  );

  const totalAmount = Number(prices.base_price + revenuePercentage).toFixed(2);

  return { revenuePercentage, totalAmount };
};
