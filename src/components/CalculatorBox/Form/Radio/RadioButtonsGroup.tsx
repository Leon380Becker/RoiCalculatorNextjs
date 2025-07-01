import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Typography, Box } from "@mui/material";

type Value = 1 | 2 | 3 | 4;

export function RowRadioButtonsGroup({ value, onValueChange }: {
  value: Value;
  onValueChange: (value: Value) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  onValueChange(Number(e.target.value) as Value);
};

  return (
    <Box sx={{ width: "100%" }}>
      <FormLabel 
        id="demo-row-radio-buttons-group-label" 
        sx={{ color: '#4a5769', display: "block", mb: 1 }} 
      >
        Sprint Planning Frequency
      </FormLabel>

      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={handleChange}
        sx={{
          display: "flex",
          flexWrap: "wrap",  
          justifyContent: "space-between", 
          gap: 1, 
          alignItems: "center",
          mt: 1,
        }}
      >
        {[1, 2, 3, 4].map((val) => (
          <FormControlLabel
            key={val}
            value={val}
            control={
              <Radio
                sx={{
                  color: "#BFBFBF",
                  "& .MuiSvgIcon-root": {
                    backgroundColor: "#e7e8e9",
                    borderRadius: "50%",
                    width: "1em",
                    height: "1em",
                  },
                  "&.Mui-checked": {
                    color: "#5D08FF",
                  },
                  "&.Mui-checked .MuiSvgIcon-root path": {
                    transform: "scale(1.6)",
                    transformOrigin: "center",
                    fill: "#5D08FF",
                  },
                  "& .MuiSvgIcon-root path": {
                    fill: "none",
                  },
                  "&.Mui-focusVisible": {
                    outline: "none",
                    boxShadow: "none",
                  },
                  "& .MuiTouchRipple-root": {
                    display: "none",
                  },
                }}
              />
            }
            label={<Typography variant="body2">{`${val} week${val > 1 ? 's' : ''}`}</Typography>}
            sx={{
              color: "#4a5769",
              display: "flex", 
              alignItems: "center",
              m: 0, 
            }}
          />
        ))}
      </RadioGroup>
    </Box>
  );
}
