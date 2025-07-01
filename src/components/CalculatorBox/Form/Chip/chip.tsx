import React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export function BasicChips({ label = "Default Chip", onClick }: {
  label?: string,
  onClick?: () => any
}) {
  return (
    <Stack direction="row" spacing={1} sx={{ mt: 2 }}> 
      <Chip 
        label={label} 
        onClick={onClick} 
        sx={{
          backgroundColor: "#330066", 
          color: "white", 
          fontSize: "0.9em",
          padding: "22px 30px",
          borderRadius: "120px",
          cursor: "pointer", 
          "&:hover": {
            backgroundColor: "#0aebd2",
            color: "#330066",
          }
        }} 
      />
    </Stack>
  );
}

