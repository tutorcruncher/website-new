export const calculateGBFees = (
  revenue: number,
  onlinePercent: number,
  offlinePercent: number,
  pricing
) => {
  const fees = Number(pricing?.fees)
  const basePrice = Number(pricing?.base_price);
  const onlineAmount = Number(
    (
      revenue *
      (fees / 100) *
      (onlinePercent / 100)
    ).toFixed(2)
  );
  const offlineAmount = Number(
    (
      revenue *
      (offlinePercent / 100) *
      (1 - onlinePercent / 100)
    ).toFixed(2)
  );
  const totalAmount = Number(
    basePrice + onlineAmount + offlineAmount
  ).toFixed(2);


  return { onlineAmount, offlineAmount, totalAmount };
};

export const calculateFees = (revenue: number, fees: number, basePrice: number,) => {
  const revenuePercentage = Number(
    (revenue * (Number(fees) / 100)).toFixed(2)
  );

  const totalAmount = Number(basePrice + revenuePercentage).toFixed(2);

  return { revenuePercentage, totalAmount };
};
