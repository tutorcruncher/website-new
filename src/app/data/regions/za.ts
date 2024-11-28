export const za = {
  name: "South Africa",
  region_code: "za",
  currency: "R",
  currency_code: "ZAR",
  pricing: {
    payg: {
      revenue_percentage: 1,
      base_price: 565,
    },
    startup: {
      revenue_percentage: 0.65,
      base_price: 1350,
    },
    enterprise_limit: 10000000,
    enterprise: true,
    support: {
      free: 0,
      chat: 185,
      phone: 1850,
    },
    extra_branch_fee: 900,
    custom_domain_fee: 1700,
    video_call_minutes_allowance: 20000,
    video_call_minutes_fee: 0.12,
    video_recording_minutes_fee: 5.5,
    video_storage_minutes_fee: 0.145,
  },
  bill_in_gbp: true,
  london: {
    mon_fri: "9am - 5:30pm (British Time)",
    phone: "+442039661863",
    phone_formatted: "020 3966 1863",
  },
  chicago: {
    mon_fri: "8am - 4:30pm (EST)",
    phone: "+1 312-820-9224",
    phone_formatted: "+1 312-820-9224",
  },
};
