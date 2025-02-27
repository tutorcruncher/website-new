export type RegionData = {
  qual_levels: Record<string, string>;
  subjects: Record<string, string>;
  data: Record<
    string,
    Record<
      string,
      {
        charge_rate: number;
        pay_rate: number;
      }
    >
  >;
};
