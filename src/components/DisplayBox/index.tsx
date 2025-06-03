import React, {forwardRef} from "react";
import { Box, Typography } from "@mui/material";
import { IntroDivider } from "./Form/DataDivider/DataDivider";
import { GraphCard } from "./Form/Graph";
import { calculateAll, displayDollars } from "../../helpers";


interface DisplayBoxProps {
  state: any; 
}

export const DisplayBox = forwardRef<HTMLDivElement, DisplayBoxProps>(
  ({ state,  }, ref) => {
    const {
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
      cumulativeOutputArray,
      annualAvgYearOne,
      annualAvgYearTwo,
      annualAvgYearThree,
    } = calculateAll(state);

  // === Data Sections for Clean Rendering ===

  const roiBreakdownItems: [(string | React.JSX.Element), string][] = [
    ["Average number of delays per year", delaysPerYear.toString()],
    ["Average number of teams impacted", teamsImpacted.toString()],
    ["Average delay duration in days", avgDelayDuration.toString()],
    ["Annual cost of sprints per team", displayDollars(annualCostOfSprintsPerTeam)],
    ["Annual cost of sprints per organisation", displayDollars(annualCostOfSprintsPerOrganisation)],
    ["Annual cost of engineering and product delays", displayDollars(annualCostOfDelays)],
    [
      <>Annual cost of retro cost per team <br />(.75hrs per week of sprint)</>,
      displayDollars(annualCostRetroPerTeam),
    ],
    [
      <>Annual cost of retro cost per organisation <br />(.75hrs per week of sprint)</>,
      displayDollars(annualCostRetroPerOrg),
    ],
  ];

  const toolingItems = [
    ["Cost of Easy Agile TeamRhythm", displayDollars(costOfEatr)],
    ["Cost of Easy Agile Programs", displayDollars(costOfEapro)],
    ["Cost of Easy Agile Roadmaps", displayDollars(costOfEaroa)],
    ["Bundle (all products)", displayDollars(bundleCost)],
  ]

  const productivityItems: [(string | React.JSX.Element), string][] = [
    ["Retro improvement - 12.5% improvement", displayDollars(retroImprovement)],
    [
      <>Sprint predictability (reduction in delay) <br />- 7.5% improvement</>,
      displayDollars(sprintPredictability),
    ],
    [
      <>Sprint efficiency via collaboration and <br />visibility - 10% improvement</>,
      displayDollars(sprintEfficiency),
    ],
  ];

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        backgroundColor: "#E5D7FF",
        flexDirection: { xs: "column", lg: "row" },
        alignItems: "stretch",
        justifyContent: "space-between",
        paddingTop: "5%",
        paddingBottom: "5%",
        borderRadius: 2,
        paddingX: { xs: "6%", sm: "10%" },
        boxSizing: "border-box",
        gap: "5%",
      }}
    >
      {/* === Left Section: ROI Details === */}
      <Box
        sx={{
          width: "100%",
          flex: { xs: "auto", lg: 4 },
          minWidth: { xs: "100%", lg: "40%" },
          maxWidth: { lg: "45%" },
        }}
      >
        <Typography variant="h5" component="h1" sx={{ fontWeight: "bold", mb: 2 }}>
          ROI in detail
        </Typography>
        {roiBreakdownItems.map(([title, value], idx) => (
          <IntroDivider key={idx} title={title} value={value} />
        ))}

        <Typography variant="h5" component="h1" sx={{ mt: 4, fontWeight: "bold" }}>
          Tooling Cost
        </Typography>
        {toolingItems.map(([title, value], idx) => (
          <IntroDivider key={idx} title={title} value={value} />
        ))}

        <Typography variant="h5" component="h1" sx={{ mt: 4, fontWeight: "bold" }}>
          Productivity (annual)
        </Typography>
        {productivityItems.map(([title, value], idx) => (
          <IntroDivider key={idx} title={title} value={value} />
        ))}
      </Box>

      {/* === Right Section: ROI Graph === */}
      <Box
        sx={{
          width: "100%",
          flex: { xs: "auto", lg: 6 },
          minWidth: { xs: "100%", lg: "50%" },
          maxWidth: { lg: "55%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: { xs: 8, sm: 10, lg: "auto" },
          mb: { xs: 8, sm: 10, lg: "auto" },
          py: { xs: 8, sm: 10 },
        }}
      >
        <GraphCard
          ref={ref}
          annualAvgYearOne={annualAvgYearOne}
          annualAvgYearTwo={annualAvgYearTwo}
          annualAvgYearThree={annualAvgYearThree}
          cumulativeOutputArray={cumulativeOutputArray}
        />
      </Box> 
    </Box>
  );
}
)