import React from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { REGION, ORGANISATIONAL_SIZE } from "@src/constants";
import { type State } from "@src/helpers";
import { StepperSlider } from "./Slider/StepperSlider";
import { ContinousSlider } from "./Slider/ContinousSlider";
import { RowRadioButtonsGroup } from "./Radio/RadioButtonsGroup";

// Props type
type CalculatorFormProps = {
  state: State;
  setState: (state: State | ((prev: State) => State)) => void;
};

export function CalculatorForm({ state, setState }: CalculatorFormProps) {
  const handleChange = (key: keyof State) => (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setState((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleSliderChange = (key: keyof State) => (value: number) => {
    setState((prevState) => ({ ...prevState, [key]: value }));
  };

  const possibleEmployeeNums = Object.keys(ORGANISATIONAL_SIZE.DELAYS_PER_PROJECT)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
        padding: 2,
        paddingTop: 0,
        boxSizing: "border-box",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Region Selector */}
      <FormControl fullWidth>
        <Typography variant="h6" sx={{ pb: 1, color: "#4a5769", fontSize: "0.85em" }}>
          Location
        </Typography>
        <Select
          value={state.location}
          onChange={handleChange("location")}
          variant="filled"
          displayEmpty
          sx={{
            borderRadius: "8px",
            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center",
              paddingTop: "10px",
              paddingBottom: "10px",
              fontWeight: "600",
              fontSize: "0.9em",
              color: "#4a5769",
              backgroundColor: "#e7e8e9",
              borderRadius: "8px",
            },
            "&:before, &:after": { display: "none" },
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          }}
          inputProps={{}}
        >
          <MenuItem value={REGION.N_AMERICA}>Nth Americas</MenuItem>
          <MenuItem value={REGION.S_AMERICA}>Sth Americas</MenuItem>
          <MenuItem value={REGION.EUROPE}>Europe</MenuItem>
          <MenuItem value={REGION.ASIA}>Asia</MenuItem>
          <MenuItem value={REGION.MIDDLE_EAST_AFRICA}>Middle East & Africa</MenuItem>
          <MenuItem value={REGION.OCEANIA}>Oceania</MenuItem>
        </Select>
        <Typography variant="h6" sx={{ pt: 1, color:"#4a5769", fontSize: "0.85em" }}>
          Choose your Local region
        </Typography>
      </FormControl>

      {/* Stepper Slider: Employees */}
      <StepperSlider
        id="employee-num"
        title="Number of employees"
        currentStep={state.employeeNumIndex ?? 0}
        onStepChange={handleSliderChange("employeeNumIndex")}
        possibleValues={possibleEmployeeNums}
      />

      {/* Continuous Slider: Engineers */}
      <ContinousSlider
        id="engineer-num"
        title="Number of developers/engineers"
        value={state.engineerNum ?? 1}
        onValueChange={handleSliderChange("engineerNum")}
        minValue={1}
        maxValue={1000}
      />

      {/* Continuous Slider: Teams */}
      <ContinousSlider
        id="teams-num"
        title="Number of developer/engineering teams"
        value={state.teamsNum ?? 1}
        onValueChange={handleSliderChange("teamsNum")}
        minValue={1}
        maxValue={500}
      />

      {/* Sprint Planning Frequency Radio Buttons */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}>
        <RowRadioButtonsGroup
          value={state.sprintPlanningFreq}
          onValueChange={handleSliderChange("sprintPlanningFreq")}
        />
      </Box>
    </Box>
  );
}
