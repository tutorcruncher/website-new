export const ca = {
  name: "Canada",
  region_code: "ca",
  currency: "C$",
  currency_code: "CAD",
  pricing: {
    payg: {
      revenue_percentage: 1,
      base_price: 45,
    },
    startup: {
      revenue_percentage: 0.65,
      base_price: 105,
    },
    enterprise: {
      base_price: 1400,
    },
    enterprise_limit: 1000000,
    support: {
      free: 0,
      chat: 18,
      phone: 180,
    },
    extra_branch_fee: 70,
    custom_domain_fee: 125,
    video_call_minutes_allowance: 20000,
    video_call_minutes_fee: 0.014,
    video_recording_minutes_fee: 0.04,
    video_storage_minutes_fee: 0.011,
  },
  bill_in_gbp: true,
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
