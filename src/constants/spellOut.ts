export const SPELL_OUT = {
  SPRINTS: {
    1: 50,
    2: 25,
    3: 17,
    4: 12
  },
  RETROS: {
    1: 48,
    2: 23,
    3: 16,
    4: 12,
  }
}

export type SprintPlanningFrequency = keyof (typeof SPELL_OUT)['SPRINTS'];