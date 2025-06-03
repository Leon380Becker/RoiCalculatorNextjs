"use client"

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  ThemeProvider
} from "@mui/material";
import { REGION } from "@src/constants";
import { CalculatorBox, DisplayBox } from "@src/components";
import { theme } from '@src/theme'
import { type State } from "@src/helpers";

export default function Root() {
  const displayBoxRef = useRef<any>(null)

  const [state, setState] = useState<State>({
    location: REGION.N_AMERICA,
    employeeNumIndex: 0,
    engineerNum: 1,
    teamsNum: 1,
    sprintPlanningFreq: 1,
  });

  useEffect(() => {
    console.log("State:", state); // Check the state values for debugging
  }, [state]);

  const getChartImage = () => {
    return displayBoxRef.current?.getChartImage()
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "100%",
            margin: "0 auto",
            overflowX: "hidden",
          }}
        >
          <CalculatorBox state={state} setState={setState} getChartImage={getChartImage} />
          <Box sx={{ flex: 1, backgroundColor: "#E5d7ff" }}>
            <DisplayBox ref={displayBoxRef} state={state} />
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
}
