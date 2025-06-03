import React, { forwardRef } from "react";
import { Graph } from "./Graph";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

/**
 * GraphCard component renders a styled card containing:
 * - A responsive graph
 * - ROI legend labels below the chart
 * 
 * Props:
 * - annualAvgYearOne, annualAvgYearTwo, annualAvgYearThree: Annual average ROI values
 * - cumulativeOutputArray: Array of cumulative ROI values to plot over time
 */
export const GraphCard = forwardRef<any, {
  cumulativeOutputArray: number[];
  annualAvgYearOne: number;
  annualAvgYearTwo: number;
  annualAvgYearThree: number;
}>(({
  annualAvgYearOne,
  annualAvgYearTwo,
  annualAvgYearThree,
  cumulativeOutputArray,
}, ref) => {
  const safeArray = (arr: number[]) =>
    Array.isArray(arr) && arr.length >= 36
      ? arr.map((val) => (typeof val === "number" && !isNaN(val) ? val : 0))
      : new Array(36).fill(0);

  const safeNumber = (val?: number) => (typeof val === "number" && !isNaN(val) ? val : 0);

  const safeCumulativeOutput = safeArray(cumulativeOutputArray);
  const safeAvgOne = safeNumber(annualAvgYearOne);
  const safeAvgTwo = safeNumber(annualAvgYearTwo);
  const safeAvgThree = safeNumber(annualAvgYearThree);

  const LegendItem = ({ color, label }: { color: string; label: string }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box
        sx={{
          width: 25,
          height: 5,
          backgroundColor: color,
          borderRadius: "4px",
        }}
      />
      <Typography fontWeight="bold" fontSize="0.9rem">
        {label}
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "450px",
        padding: { xs: "2vw", sm: "24px" },
        margin: { xs: "1vw", sm: "auto" },
        paddingTop: { xs: "20%", sm: "10%" },
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "6px 6px 40px rgba(0, 0, 0, 0.05)",
        backgroundColor: "white",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ width: "100%", paddingLeft: 0, margin: 0 }}>
        <Graph
          ref={ref}
          annualAvgYearOne={safeAvgOne}
          annualAvgYearTwo={safeAvgTwo}
          annualAvgYearThree={safeAvgThree}
          cumulativeOutputArray={safeCumulativeOutput}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          paddingTop: "4%",
          paddingBottom: "8%",
        }}
      >
        <LegendItem color="#5F0BFF" label="ROI" />
        <LegendItem color="red" label="Annual Average ROI" />
      </Box>
    </Box>
  );
});
