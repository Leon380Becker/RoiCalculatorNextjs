import React from "react";
import { Slider } from "@mui/material";
import { SliderWrapper } from "./Wrapper";

export function ContinousSlider({ id, title, footerText, value, minValue, maxValue, onValueChange }: {
  id: string;
  title: string;
  footerText?: string;
  value: number;
  minValue: number;
  maxValue: number;
  onValueChange: (value: number) => void;
}) {
  const handleChange = (_: Event, newValue: number | number[]) => {
  if (typeof newValue === 'number') {
    onValueChange(newValue);
  }
};


  return (
    <SliderWrapper title={title} footerText={footerText} value={value} minValue={minValue} maxValue={maxValue}>
      <Slider
        id={id}
        min={minValue}
        max={maxValue}
        valueLabelDisplay="auto"
        value={value}
        onChange={handleChange}
        sx={{
          color: "#5D08FF", 
          height: 8, 

          "& .MuiSlider-thumb": {
            width: 20, 
            height: 20,
            backgroundColor: "white",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", 
            "&:hover, &:focus": {
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.5)", 
            },
          },

          "& .MuiSlider-track": {
            height: 8, 
            backgroundColor: "#5D08FF",
          },

          "& .MuiSlider-rail": {
            height: 8, 
            backgroundColor: "#BFBFBF",
          },

          // Responsive styling for mobile screens
          "@media (max-width: 600px)": {
            "& .MuiSlider-thumb": {
              width: 16, 
              height: 16,
            },
            "& .MuiSlider-track": {
              height: 5.6, 
            },
            "& .MuiSlider-rail": {
              height: 5.6, 
            },
          },
        }}
      />
    </SliderWrapper>
  );
}
