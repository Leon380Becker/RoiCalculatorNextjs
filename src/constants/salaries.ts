export const SALARIES = {
  AGILE_COACH: 79,
  SCRUM_MASTER: 87,
  RTE: 71,
  DESIGNER: 77,
  PM: 90,
  DEVELOPER: 73,
};

export type SalaryType = keyof (typeof SALARIES);