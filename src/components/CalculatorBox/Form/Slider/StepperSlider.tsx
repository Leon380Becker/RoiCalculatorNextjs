import React from "react";
import { Slider } from "@mui/material";
import { SliderWrapper } from "./Wrapper";

export function StepperSlider({
  id,
  title,
  footerText,
  currentStep,
  onStepChange,
  possibleValues,
}: {
  id: string;
  title: string;
  footerText?: string;
  currentStep: number;
  onStepChange: (value: number) => void;
  possibleValues: number[];
}) {
  const steps = possibleValues.length;

  const calculateValue = (x: number) => possibleValues[x];

  const currentValue = possibleValues[currentStep];
  const minValue = 0;
  const maxValue = steps - 1;

  const handleChange = (_: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      onStepChange(newValue);
    }
  };

  return (
    <SliderWrapper
      title={title}
      footerText={footerText}
      value={currentValue}
      minValue={possibleValues[0]}
      maxValue={possibleValues[possibleValues.length - 1]}
    >
      <Slider
        id={id}
        min={minValue}
        max={maxValue}
        step={1}
        valueLabelDisplay="auto"
        value={currentStep}
        scale={calculateValue}
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
