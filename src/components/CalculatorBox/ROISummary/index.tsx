import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

import { IntroDivider } from "../../DisplayBox/IntroDivider";
import { calculateROIWindows, displayDollars, type State } from "@src/helpers";
import { ORGANISATIONAL_SIZE } from "../../../constants";
import { BasicChips } from "../Form/Chip/chip";
import ROIPopup from "../Form/Popup/Popup";
import { type EmployeeNumber } from "@src/constants"

/**
 * ROISummary
 * Displays calculated ROI, productivity gain, and ROI breakdown by year.
 * Also handles fallback UI and popup trigger.
 */
export function ROISummary({ state, getChartImage }: {
  state: State,
  getChartImage: () => any
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Derive average team size and employee size category
  const avgTeamSize = state.engineerNum / state.teamsNum;
  const employeeNumIndex = state.employeeNumIndex ?? 0;
  const employeeKeys = Object.keys(ORGANISATIONAL_SIZE.DELAYS_PER_PROJECT)
  const employeeNum = (Number(employeeKeys[employeeNumIndex]) || employeeKeys[0]) as EmployeeNumber;

  // Run ROI calculations
  const {
    yearOneCmlPct,
    yearTwoCmlPct,
    yearThreeCmlPct,
    productivityGain,
  } = calculateROIWindows({
    sprintPlanningFreq: state.sprintPlanningFreq,
    avgTeamSize,
    engineerNum: state.engineerNum,
    employeeNum,
    localRegion: state.location,
    teamsNum: state.teamsNum,
  });

  // ---------------------------
  // Fallback View (invalid ROI)
  // ---------------------------
  if (yearOneCmlPct === Infinity) {
    return (
      <Box
        sx={{
          flex: 1,
          padding: 3,
          backgroundColor: "#E5D7FF",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        {/* ROI Placeholder Section */}
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
            Return on investment (ROI)
          </Typography>
          <Typography
            variant="h1"
            component="h2"
            sx={{ mt: 1, mb: 1 }}
          >
            --%
          </Typography>
          <Typography variant="body2" component="p">
            ROI as a percentage of the initial investment.
          </Typography>
        </Box>

        {/* ROI Breakdown Placeholder */}
        <Box>
          <IntroDivider
            title="Productivity Gain"
            value="$ --"
            description={
              <>
                Calculated as the sum of <br />
                revenue increase and cost <br />
                savings over the years
              </>
            }
          />
          <IntroDivider title="Cumulative ROI" value="--%" description="Year 1" />
          <IntroDivider title="Cumulative ROI" value="--%" description="Year 2" />
          <IntroDivider title="Cumulative ROI" value="--%" description="Year 3" />
        </Box>

        {/* CTA Section */}
        <Box sx={{ alignSelf: "flex-start" }}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: "bold", mb: 1 }}>
            Want to know more?
          </Typography>
          <Typography variant="body2" component="h6">
            See how Easy Agile can maximise <br />
            your investment
          </Typography>
          <BasicChips label="Get My ROI Report" />
        </Box>
      </Box>
    );
  }

  // ---------------------------
  // Main ROI View
  // ---------------------------
  return (
    <Box
      sx={{
        flex: 1,
        padding: 3,
        backgroundColor: "#E5D7FF",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      {/* ROI Summary */}
      <Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          Return on investment (ROI)
        </Typography>
        <Typography
          variant="h1"
          component="h2"
          sx={{ mt: 1, mb: 1 }}
        >
          {`${yearThreeCmlPct}%`}
        </Typography>
        <Typography variant="body2" component="p">
          ROI as a percentage of the initial investment.
        </Typography>
      </Box>

      {/* ROI Breakdown */}
      <Box>
        <IntroDivider
          title="Productivity Gain"
          value={displayDollars(productivityGain)}
          description={
            <>
              Calculated as the sum of <br />
              revenue increase and cost <br />
              savings over the years
            </>
          }
        />
        <IntroDivider title="Cumulative ROI" value={`${yearOneCmlPct}%`} description="Year 1" />
        <IntroDivider title="Cumulative ROI" value={`${yearTwoCmlPct}%`} description="Year 2" />
        <IntroDivider title="Cumulative ROI" value={`${yearThreeCmlPct}%`} description="Year 3" />
      </Box>

      {/* CTA Section */}
      <Box sx={{ alignSelf: "flex-start" }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: "bold", mb: 1 }}>
          Want to know more?
        </Typography>
        <Typography variant="body2" component="h6">
          See how Easy Agile can maximise <br />
          your investment
        </Typography>
        <BasicChips
          label="Get My ROI Report"
          onClick={() => setIsPopupOpen(true)}
        />
      </Box>

      {/* Popup for requesting ROI Report */}
      <ROIPopup
        state={state}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        getChartImage={getChartImage}
      />
    </Box>
  );
}
