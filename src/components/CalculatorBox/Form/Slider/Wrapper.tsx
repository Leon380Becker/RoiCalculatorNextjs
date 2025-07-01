import React from "react";
import { Box, Typography } from "@mui/material";

export function SliderWrapper({
  children,
  title,
  footerText,
  minValue,
  maxValue,
  value,
}: {
  children: React.ReactNode;
  title: string;
  footerText?: string;
  minValue: number;
  maxValue: number;
  value: number;
}) {
  return (
    <>
      {/* Title & Value */}
      <Box
        sx={{
          color: "#4a5769",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "8%",
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          component="h6"
          sx={{
            color: "#4a5769",
            "@media (max-width: 600px)": {
              fontSize: "14px",
            },
          }}
        >
          {title}
        </Typography>

        {/* Value Box */}
        <Box
          sx={{
            width: "70px",
            backgroundColor: "#e7e8e9",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
            height: "40px",
            "@media (max-width: 600px)": {
              height: "30px",
            },
          }}
        >
          <Typography
            variant="h5"
            component="h5"
            sx={{
              fontSize: "16px",
              lineHeight: "normal",
              "@media (max-width: 600px)": {
                fontSize: "14px",
              },
            }}
          >
            {value}
          </Typography>
        </Box>
      </Box>

      {/* Slider */}
      {children}

      {/* Min & Max */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: "5px",
          position: "relative",
          color: "#4a5769",
          "@media (max-width: 600px)": {
            paddingTop: "0px",
            paddingBottom: "2px",
          },
        }}
      >
        <Typography variant="body2">{minValue}</Typography>
        <Typography variant="body2">{maxValue}</Typography>
      </Box>

      {/* Footer Text */}
      {footerText && (
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            paddingTop: "10px",
            "@media (max-width: 600px)": {
              fontSize: "80%",
              paddingTop: "5px",
            },
          }}
        >
          <Typography variant="body2">{footerText}</Typography>
        </Box>
      )}

      {/* Mobile-only separator line */}
      <Box
        sx={{
          height: "1px",
          backgroundColor: "#E1E2E4",
          marginTop: "10px",
          "@media (max-width: 600px)": {
            display: "block",
          },
          "@media (min-width: 601px)": {
            display: "none",
          },
        }}
      />
    </>
  );
}
