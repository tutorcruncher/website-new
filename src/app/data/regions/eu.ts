export const eu = {
  name: "Europe",
  region_code: "eu",
  currency: "€",
  currency_code: "EUR",
  pricing: {
    payg: {
      revenue_percentage: 1,
      base_price: 28,
    },
    startup: {
      revenue_percentage: 0.65,
      base_price: 65,
    },
    enterprise: true,
    enterprise_limit: 1000000,
    support: {
      free: 0,
      chat: 12,
      phone: 120,
    },
    extra_branch_fee: 45,
    custom_domain_fee: 90,
    video_call_minutes_allowance: 20000,
    video_call_minutes_fee: 0.0095,
    video_recording_minutes_fee: 0.0285,
    video_storage_minutes_fee: 0.0076,
  },
  london: {
    phone: "+442039661863",
    phone_formatted: "020 3966 1863",
    mon_fri: "9am - 5:30pm (British Time)",
  },
  chicago: {
    phone: "+1 312-820-9224",
    phone_formatted: "+1 312-820-9224",
    mon_fri: "8am - 4:30pm (EST)",
  },
};
