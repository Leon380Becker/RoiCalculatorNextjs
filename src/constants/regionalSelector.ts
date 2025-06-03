export const REGION = {
  OCEANIA: 'OCEANIA',
  ASIA: 'ASIA',
  EUROPE: 'EUROPE',
  MIDDLE_EAST_AFRICA: 'MIDDLE_EAST_AFRICA',
  N_AMERICA: 'N_AMERICA',
  S_AMERICA: 'S_AMERICA'
} as const

export const REGIONAL_SELECTOR = {
  OCEANIA: 0.7,
  ASIA: 0.4,
  EUROPE: 0.75,
  MIDDLE_EAST_AFRICA: 0.6,
  N_AMERICA: 1,
  S_AMERICA: 0.52
};

export type Region = keyof (typeof REGION);
