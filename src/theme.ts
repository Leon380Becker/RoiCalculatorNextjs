'use client';

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 400,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    allVariants: {
      fontFamily: "Inter, sans-serif",
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variant: "body2", // 👈 This ensures "inherit" is replaced by "body2"
      },
    },
  },
});
