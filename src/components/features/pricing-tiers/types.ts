export interface FeaturesList {
  heading: string;
  features: string[];
}

export interface Tier {
  id: string;
  name: string;
  price: string;
  featuresList: FeaturesList[];
  cta: string;
  billingCycle: string;
}

export interface Tiers {
  tiers: Tier[];
}
