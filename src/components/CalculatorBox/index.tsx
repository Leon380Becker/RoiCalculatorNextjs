import React from "react";
import {
  Box,
  Typography,
  Card,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { type State } from "@src/helpers";
import { CalculatorForm } from "./Form/index";
import { ROISummary } from "./ROISummary/index";

/**
 * CalculatorBox is the main container for:
 * - Intro text
 * - ROI Calculator form
 * - Summary of calculated output
 * 
 * Props:
 * - state: Form values & computed results
 * - setState: Setter to update state
 */
export function CalculatorBox({ state, setState, getChartImage }: {
  state: State;
  setState: (state: State | ((prev: State) => State)) => void;
  getChartImage: () => void
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        backgroundColor: "#f9fafb",
        flexDirection: { xs: "column", lg: "row" },
        alignItems: "center",
        paddingX: { xs: "2%", sm: "9%" },
        paddingY: "5%",
        boxSizing: "border-box",
      }}
    >
      {/* --------- Left Section: Text + Headings --------- */}
      <Box
        sx={{
          flex: 4,
          padding: 2,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontWeight: "bold",
            color: "#5D08FF",
            fontSize: { xs: "1.2rem", md: "1.5rem" },
          }}
        >
          ROI Calculator
        </Typography>

        <Typography
          variant="h1"
          component="h2"
          sx={{
            mt: 2,
            color: "#343a41",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          Discover how much {!isMobile && <br />}
          you could save {!isMobile && <br />}
          with Easy Agile
        </Typography>

        <Typography
          variant="h5"
          component="h2"
          sx={{
            mt: 3,
            fontSize: { xs: "1rem", md: "1.25rem" },
          }}
        >
          Use our ROI calculator to estimate the potential {!isMobile && <br />}
          gain you can expect using Easy Agile products.
        </Typography>
      </Box>

      {/* --------- Right Section: Form & Summary Card --------- */}
      <Box sx={{ flex: 5.1, padding: 2, width: "100%" }}>
        <Card
          sx={{
            padding: { xs: 1, sm: 3, md: 2 },
            borderRadius: "20px",
            boxShadow:
              "6px 6px 40px rgba(0, 0, 0, 0.15), -6px 6px 40px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              textAlign: "center",
              color: "#343a41",
              fontWeight: "bold",
              py: { xs: 2, md: 3 },
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            }}
          >
            Enter Details Below
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              gap: 2,
            }}
          >
            {/* ---- Form Section ---- */}
            <Box
              sx={{
                flex: 6,
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <CalculatorForm state={state} setState={setState} />
            </Box>

            {/* ---- Summary Section ---- */}
            <Box
              sx={{
                flex: 5,
                display: "flex",
                flexDirection: "column",
                width: "100%",
                backgroundColor: "#e8e0ff",
              }}
            >
              <ROISummary state={state} getChartImage={getChartImage} />
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}