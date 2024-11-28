export const us = {
  name: "United States",
  region_code: "us",
  currency: "$",
  currency_code: "USD",
  pricing: {
    payg: {
      revenue_percentage: 1,
      base_price: 30,
    },
    startup: {
      revenue_percentage: 0.65,
      base_price: 80,
    },
    enterprise: true,
    enterprise_limit: 1000000,
    support: {
      free: 0,
      chat: 12,
      phone: 120,
    },
    extra_branch_fee: 50,
    custom_domain_fee: 100,
    video_call_minutes_allowance: 20000,
    video_call_minutes_fee: 0.01,
    video_recording_minutes_fee: 0.03,
    video_storage_minutes_fee: 0.008,
  },
  london: {
    mon_fri: "9am - 5:30pm (British Time)",
    phone: "+442039661863",
    phone_formatted: "020 3966 1863",
  },
  chicago: {
    mon_fri: "8am - 4:30pm (EST)",
    phone: "312-820-9224",
    phone_formatted: "+1 312-820-9224",
  },
};
