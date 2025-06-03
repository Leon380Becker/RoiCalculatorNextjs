import { 
  type SprintPlanningFrequency, 
  type Region,
  type EmployeeNumber,
  type QANumber,
  SPELL_OUT, 
  SALARIES, 
  ORGANISATIONAL_SIZE, 
  COST, 
  QAPERCENTAGES
} from '../constants'

export type State = {
  location: Region;
  employeeNumIndex: number;
  engineerNum: number;
  teamsNum: number;
  sprintPlanningFreq: SprintPlanningFrequency;
}

export function calculateProjectedAnnualSprints({
  sprintPlanningFreq
}: {
  sprintPlanningFreq: SprintPlanningFrequency
}) {
  return SPELL_OUT.SPRINTS[sprintPlanningFreq];
}

export function calculateProjectedAnnualRetros({
  sprintPlanningFreq
} : {
  sprintPlanningFreq: SprintPlanningFrequency
}) {
  return SPELL_OUT.RETROS[sprintPlanningFreq];
}

export function calculateHourlyCostOfTeam({
  avgTeamSize,
  engineerNum,
  localRegion
}: {
  avgTeamSize: number,
  engineerNum: number,
  localRegion: Region
}) {
  const REGION_MULTIPLER = {
    OCEANIA: 0.85,
    ASIA: 0.47,
    EUROPE: 0.75,
    MIDDLE_EAST_AFRICA: 0.66,
    N_AMERICA: 1,
    S_AMERICA: 0.61,
  };

  const regionMultiplier = REGION_MULTIPLER[localRegion];

  const largeTeamWeight = engineerNum > 75 ? 78 : 0;

  const teamBaseCost = 
    (avgTeamSize * SALARIES.DEVELOPER) + SALARIES.PM + SALARIES.AGILE_COACH + largeTeamWeight;

  const hourlyCostOfTeam = teamBaseCost * regionMultiplier;

  return hourlyCostOfTeam;
}

// constants used
const WORK_HOURS_PER_DAY = 8;
const WORK_DAYS_PER_WEEK = 5;
const HOURS_PER_SPRINT_WEEK = 0.75;
const RETRO_IMPROVEMENT = 0.125;
const SPRINT_PREDICTABILITY = 0.075;
const SPRINT_EFFICIENCY = 0.1;
const YEAR_TWO_MULTIPLIER = 1.06;
const YEAR_THREE_MULTIPLIER = 1.13;
const YEAR_TWO_PER_MULTIPLIER = 2;
const YEAR_THREE_PER_MULTIPLIER = 3;

export function calculateDelayDurationAndDailycost({
  employeeNum,
  avgTeamSize,
  engineerNum,
  localRegion
}: {
  employeeNum: EmployeeNumber,
  avgTeamSize: number,
  engineerNum: number,
  localRegion: Region
}) {
  const hourlyCostOfTeam = calculateHourlyCostOfTeam({
    avgTeamSize,
    engineerNum,
    localRegion
  });

  const dailyCostOfTeam = hourlyCostOfTeam * WORK_HOURS_PER_DAY;
  const delayDurationAndDailycost = ORGANISATIONAL_SIZE.DELAY_DURATION[employeeNum] * dailyCostOfTeam;

  return delayDurationAndDailycost;
}


// teamsImpactedAndAnnualDelays
export function calculateteamsImpactedAndAnnualDelays({
  employeeNum,
}: {
  employeeNum: EmployeeNumber
}) {
  const teamsImpactedAndAnnualDelays = (ORGANISATIONAL_SIZE.TEAMS_IMPACTED[employeeNum]) * (ORGANISATIONAL_SIZE.DELAYS_PER_PROJECT[employeeNum]);

  return teamsImpactedAndAnnualDelays;
}

// Cost of EATR
export function calculatecostOfEatr({
  employeeNum,
}: {
  employeeNum: EmployeeNumber
}) {
  return COST.EATR[employeeNum];
} 

  

// Cost of EAPro
export function calculatecostOfEapro({
  employeeNum,
}: {
  employeeNum: EmployeeNumber
}) {
  return COST.EAPRO[employeeNum];
}

// Cost of EARoa
export function calculatecostOfEaroa({
  employeeNum,
}: {
  employeeNum: EmployeeNumber
}) {
  return COST.EAR[employeeNum];
}


// Retro Improvement
export function calculateRetroImprovement({
  avgTeamSize,
  engineerNum,
  localRegion,
  sprintPlanningFreq,
  teamsNum
}: {
  avgTeamSize: number,
  engineerNum: number,
  localRegion: Region,
  sprintPlanningFreq: SprintPlanningFrequency,
  teamsNum: number
}) {
  const projectedAnnualRetros = calculateProjectedAnnualRetros({
    sprintPlanningFreq
  })

  const hourlyCostOfTeam = calculateHourlyCostOfTeam({
    avgTeamSize,
    engineerNum,
    localRegion
  })

  const annualCostRetroPerTeam = sprintPlanningFreq * HOURS_PER_SPRINT_WEEK * hourlyCostOfTeam * projectedAnnualRetros;

  const annualCostRetroPerOrg = annualCostRetroPerTeam * teamsNum;

  return Math.round(annualCostRetroPerOrg * RETRO_IMPROVEMENT);
}

export function calculateSprintPredictability({
  employeeNum,
  avgTeamSize,
  engineerNum,
  localRegion
}: {
  employeeNum: EmployeeNumber,
  avgTeamSize: number,
  engineerNum: number,
  localRegion: Region,
}) {
  const delayDurationAndDailycost = calculateDelayDurationAndDailycost({
    employeeNum,
    avgTeamSize,
    engineerNum,
    localRegion
  }) 

  const teamsImpactedAndAnnualDelays = calculateteamsImpactedAndAnnualDelays({
    employeeNum,
  }) 


// annual Cost Of Eng And Prod Delay
  const annualCostOfEngAndProdDelay = delayDurationAndDailycost * teamsImpactedAndAnnualDelays;

  return Math.round(annualCostOfEngAndProdDelay * SPRINT_PREDICTABILITY);
}

export function calculateSprintEfficiency({
  sprintPlanningFreq,
  avgTeamSize,
  engineerNum,
  localRegion
}: {
  avgTeamSize: number,
  engineerNum: number,
  localRegion: Region,
  sprintPlanningFreq: SprintPlanningFrequency,
}) {
  const projectedAnnualSprints = calculateProjectedAnnualSprints({
    sprintPlanningFreq
  })

  const hourlyCostOfTeam = calculateHourlyCostOfTeam({
    avgTeamSize,
    engineerNum,
    localRegion
  })

  const dailyCostOfTeam = hourlyCostOfTeam * WORK_HOURS_PER_DAY;
  const teamEngineeringSprintCost = (dailyCostOfTeam * WORK_DAYS_PER_WEEK) * sprintPlanningFreq;

  // Sprint efficiency via collaboration and visibility - 10% improvement
  return Math.round(teamEngineeringSprintCost * SPRINT_EFFICIENCY * projectedAnnualSprints);
}

function calculateBundleCost({
  employeeNum
}: {
  employeeNum: EmployeeNumber
}) {
  const costOfEatr = calculatecostOfEatr({
    employeeNum
  })
  
  // Cost of EAPro
  const costOfEapro = calculatecostOfEapro({
    employeeNum
  })
  
  // Cost of EARoa
  const costOfEaroa = calculatecostOfEaroa({
    employeeNum
  })
  
  // Bundle (all product)
  return costOfEapro + costOfEatr + costOfEaroa;
}

// ROI WINDOWS
export function calculateROIWindows({
  sprintPlanningFreq,
  avgTeamSize,
  engineerNum,
  employeeNum,
  teamsNum,
  localRegion
}: {
  avgTeamSize: number,
  engineerNum: number,
  localRegion: Region,
  employeeNum: EmployeeNumber,
  sprintPlanningFreq: SprintPlanningFrequency,
  teamsNum: number
}) {
  const retroImprovement = calculateRetroImprovement({
    avgTeamSize,
    engineerNum,
    localRegion,
    sprintPlanningFreq,
    teamsNum,
  });

  // Sprint predictability (reduction in delay) - 7.5% improvement
  const sprintPredictability = calculateSprintPredictability({
    employeeNum,
    avgTeamSize,
    engineerNum,
    localRegion,
  });

  const sprintEfficiency = calculateSprintEfficiency({
    sprintPlanningFreq,
    avgTeamSize,
    engineerNum,
    localRegion
  })

  const costOfEatr = calculatecostOfEatr({ employeeNum });

  const yearOne = retroImprovement + sprintPredictability + sprintEfficiency;
  const yearTwo = Math.round(yearOne * YEAR_TWO_MULTIPLIER);
  const yearThree = Math.round(yearTwo * YEAR_THREE_MULTIPLIER);
  const productivityGain = Math.round(retroImprovement + sprintPredictability + sprintEfficiency);

  const yearOneCml = Math.round(yearOne);
  const yearTwoCml = Math.round(yearOne + yearTwo);
  const yearThreeCml = Math.round(yearTwoCml + yearThree);

  const bundleCost = calculateBundleCost({ employeeNum });

  

  const finalOutputs: Record<string, number> = {};
  const cumulativeOutputs: Record<string, number> = {};
  
  // Ensure QAPERCENTAGES keys are processed correctly
  Object.entries(QAPERCENTAGES).forEach(([key, multiplier]) => {
    const monthIndex = Number(key); // Ensure numeric key
  
    if (isNaN(monthIndex)) {
      console.error(`❌ Invalid key in QAPERCENTAGES: ${key}`);
      return;
    }
  
    let valueMultiplier;
    if (monthIndex >= 1 && monthIndex <= 12) {
      valueMultiplier = yearOne;
    } else if (monthIndex >= 13 && monthIndex <= 24) {
      valueMultiplier = yearTwo;
    } else if (monthIndex >= 25 && monthIndex <= 36) {
      valueMultiplier = yearThree;
    } else {
      console.warn(`⚠️ Unexpected month index: ${monthIndex}`);
      return;
    }
  
    
    finalOutputs[`month${monthIndex}`] = Math.round(multiplier * valueMultiplier);
  });


  const dollarFigure = [];

  // First 12 values (yearOne * QAPERCENTAGES[1-12])
  for (let i = 1; i <= 12; i++) {
    const value = Math.round(yearOne * (QAPERCENTAGES[i as QANumber] || 0));
    dollarFigure.push(value);
  }

  // Next 12 values (yearTwo * QAPERCENTAGES[13-24])
  for (let i = 13; i <= 24; i++) {
    const value = Math.round(yearTwo * (QAPERCENTAGES[i as QANumber] || 0));
    dollarFigure.push(value);
  }

  // Last 12 values (yearThree * QAPERCENTAGES[25-36])
  for (let i = 25; i <= 36; i++) {
    const value = Math.round(yearThree * (QAPERCENTAGES[i as QANumber] || 0));
    dollarFigure.push(value);
  }


  const monthlyPercentages = dollarFigure.map((value, index) => {
    const percentage = Math.round((value / costOfEatr) * 100);
    return percentage;
  });

  // Helper function to calculate the average of an array slice
  const calculateAverage = (arr: number[], start: number, end: number) => {
    const subset = arr.slice(start, end);
    const sum = subset.reduce((acc, val) => acc + val, 0);
    return sum / subset.length || 0; // Avoid division by zero
  };

  
  // Generate cumulative outputs
  let cumulativeSum = 0;
  Object.keys(finalOutputs).forEach((key, index) => {
    cumulativeSum += finalOutputs[key]; // Add the current value to the cumulative sum
    cumulativeOutputs[key] = cumulativeSum; // Store the cumulative sum
  });

  const cumulativeOutputArray = Object.values(cumulativeOutputs);
  
  //Annual Average Roi 
  const annualAvgYearOne = Math.round((yearOne/bundleCost) * 100);
  const annualAvgYearTwo = Math.round(calculateAverage(monthlyPercentages, 12, 24));
  const annualAvgYearThree = Math.round(calculateAverage(monthlyPercentages, 24, 36));


  // ROI percentages
  const yearOnePct = Math.round ((yearOneCml / bundleCost) * 100);
  const yearTwoPct = Math.round ((yearTwo / (bundleCost * YEAR_TWO_PER_MULTIPLIER)) * 100);
  const yearThreePct = Math.round ((yearThree / (bundleCost * YEAR_THREE_PER_MULTIPLIER)) * 100);

  //Cumulative Roi
  const yearOneCmlPct = Math.round(yearOnePct);
  const yearTwoCmlPct = Math.round(yearOnePct + yearTwoPct);
  const yearThreeCmlPct = Math.round(yearTwoCmlPct + yearThreePct);

  return {
    yearOneCmlPct,
    yearTwoCmlPct,
    yearThreeCmlPct,
    cumulativeOutputs,
    yearOneCml,
    yearTwoCml,
    yearThreeCml,
    annualAvgYearOne,
    annualAvgYearTwo,
    annualAvgYearThree,
    cumulativeOutputArray,
    productivityGain
  }
}

export function calculateAnnualCostOfSprintsPerTeam({
  engineerNum,
  teamsNum,
  localRegion,
  sprintPlanningFreq
} : {
  engineerNum: number,
  localRegion: Region,
  sprintPlanningFreq: SprintPlanningFrequency,
  teamsNum: number
}) {
  const avgTeamSize = engineerNum / teamsNum;

  const hourlyCostOfTeam = calculateHourlyCostOfTeam({
    avgTeamSize,
    engineerNum,
    localRegion
  });

  const dailyCostOfTeam = hourlyCostOfTeam * WORK_HOURS_PER_DAY;

  const teamEngineeringSprintCost = (dailyCostOfTeam * WORK_DAYS_PER_WEEK) * sprintPlanningFreq;

  const projectedAnnualSprints = calculateProjectedAnnualSprints({
    sprintPlanningFreq
  });

  return Math.round(projectedAnnualSprints * teamEngineeringSprintCost);
}

export function calculateAnnualCostOfDelays({
  avgTeamSize,
  engineerNum,
  localRegion,
  delaysPerYear,
  teamsImpacted,
  avgDelayDuration
} : {
  avgTeamSize: number,
  engineerNum: number,
  localRegion: Region,
  delaysPerYear: number,
  teamsImpacted: number,
  avgDelayDuration: number
}) {
  const hourlyCostOfTeam = calculateHourlyCostOfTeam({
    avgTeamSize,
    engineerNum,
    localRegion
  });
  
  const dailyCostOfTeam = hourlyCostOfTeam * WORK_HOURS_PER_DAY;


  return Math.round(dailyCostOfTeam * delaysPerYear * teamsImpacted * avgDelayDuration);
}

export function calculateCostRetrosPerTeam({
  avgTeamSize,
  engineerNum,
  localRegion,
  sprintPlanningFreq
} : {
  avgTeamSize: number,
  engineerNum: number,
  localRegion: Region,
  sprintPlanningFreq: SprintPlanningFrequency
}) {
  const hourlyCostOfTeam = calculateHourlyCostOfTeam({
    avgTeamSize,
    engineerNum,
    localRegion
  });

  const projectedAnnualRetros = calculateProjectedAnnualRetros({
    sprintPlanningFreq
  })

  return Math.round(sprintPlanningFreq * HOURS_PER_SPRINT_WEEK * hourlyCostOfTeam * projectedAnnualRetros);
}

export function displayDollars(num: number) {
  num = Math.round(num);

  let str = num.toString();

  let pattern = /(-?\d+)(\d{3})/;
  
  while (pattern.test(str))
      str = str.replace(pattern, "$1,$2");

  return `$${str}`
}
export function calculateCostRetroPerOrg({
  annualCostRetroPerTeam,
  teamsNum
}: {
  annualCostRetroPerTeam: number,
  teamsNum: number
}) {

  return Math.round(annualCostRetroPerTeam * teamsNum);
}


export function calculateAll(state: State) {
  // Get selected number of employees from dropdown index
  const employeeKeys = Object.keys(ORGANISATIONAL_SIZE.DELAYS_PER_PROJECT).map(Number)
  const employeeNum = (employeeKeys[state.employeeNumIndex] || employeeKeys[0]) as EmployeeNumber;

  // Derived input values
  const avgTeamSize = state.engineerNum / state.teamsNum;
  const delaysPerYear = ORGANISATIONAL_SIZE.DELAYS_PER_PROJECT[employeeNum];
  const teamsImpacted = ORGANISATIONAL_SIZE.TEAMS_IMPACTED[employeeNum];
  const avgDelayDuration = ORGANISATIONAL_SIZE.DELAY_DURATION[employeeNum];

  // === Cost Calculations ===

  const annualCostOfSprintsPerTeam = calculateAnnualCostOfSprintsPerTeam({
    engineerNum: state.engineerNum,
    teamsNum: state.teamsNum,
    localRegion: state.location,
    sprintPlanningFreq: state.sprintPlanningFreq,
  });

  const annualCostOfSprintsPerOrganisation =
    annualCostOfSprintsPerTeam * state.teamsNum * state.sprintPlanningFreq;

  const annualCostOfDelays = calculateAnnualCostOfDelays({
    avgTeamSize,
    engineerNum: state.engineerNum,
    localRegion: state.location,
    delaysPerYear,
    teamsImpacted,
    avgDelayDuration,
  });

  const annualCostRetroPerTeam = calculateCostRetrosPerTeam({
    avgTeamSize,
    engineerNum: state.engineerNum,
    localRegion: state.location,
    sprintPlanningFreq: state.sprintPlanningFreq,
  });

  const annualCostRetroPerOrg = calculateCostRetroPerOrg({
    annualCostRetroPerTeam,
    teamsNum: state.teamsNum,
  });

  // === Tooling Costs ===

  const costOfEatr = COST.EATR[employeeNum] || 0;
  const costOfEapro = COST.EAPRO[employeeNum] || 0;
  const costOfEaroa = COST.EAR[employeeNum] || 0;
  const bundleCost = costOfEapro + costOfEatr + costOfEaroa;

  // === Productivity Improvements ===

  const retroImprovement = calculateRetroImprovement({
    avgTeamSize,
    engineerNum: state.engineerNum,
    localRegion: state.location,
    sprintPlanningFreq: state.sprintPlanningFreq,
    teamsNum: state.teamsNum,
  });

  // Estimate based on 7.5% improvement
  const SPRINT_PREDICTABILITY_INDEX = 0.075;
  const sprintPredictability = Math.round(annualCostOfDelays * SPRINT_PREDICTABILITY_INDEX);

  const sprintEfficiency = calculateSprintEfficiency({
    avgTeamSize,
    engineerNum: state.engineerNum,
    localRegion: state.location,
    sprintPlanningFreq: state.sprintPlanningFreq,
  });

  // === ROI Windows Calculation ===

  const {
    yearOneCmlPct,
    yearTwoCmlPct,
    yearThreeCmlPct,
    cumulativeOutputArray,
    annualAvgYearOne,
    annualAvgYearTwo,
    annualAvgYearThree,
    productivityGain,
  } = calculateROIWindows({
    sprintPlanningFreq: state.sprintPlanningFreq,
    avgTeamSize,
    engineerNum: state.engineerNum,
    employeeNum,
    localRegion: state.location,
    teamsNum: state.teamsNum,
  });


  return {
    employeeKeys,
    employeeNum,
    avgTeamSize,
    delaysPerYear,
    teamsImpacted,
    avgDelayDuration,
    annualCostOfSprintsPerTeam,
    annualCostOfSprintsPerOrganisation,
    annualCostOfDelays,
    annualCostRetroPerTeam,
    annualCostRetroPerOrg,
    costOfEatr,
    costOfEapro,
    costOfEaroa,
    bundleCost,
    retroImprovement,
    sprintPredictability,
    sprintEfficiency,
    yearOneCmlPct,
    yearTwoCmlPct,
    yearThreeCmlPct,
    cumulativeOutputArray,
    annualAvgYearOne,
    annualAvgYearTwo,
    annualAvgYearThree,
    productivityGain,
  }
}