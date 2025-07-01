import React from 'react'; 
import Box from '@mui/material/Box'; 
import Stack from '@mui/material/Stack'; 
import Typography from '@mui/material/Typography';

export function IntroDivider({ title, value, description }: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <Box sx={{ mt: 2, color: "#343A41" }}>  {/* Set the color on the Box container */}
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Typography
          gutterBottom
          variant="h6"
          component="h5"
          sx={{ 
            textAlign: 'right', 
            margin: 0, 
            whiteSpace: 'nowrap', 
            fontSize: '0.875rem',
            fontWeight: 'bold' 
          }}
        >
          {title}
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="h5"
          sx={{ 
            textAlign: 'left', 
            margin: 0, 
            whiteSpace: 'nowrap', 
            fontSize: '0.875rem',
            fontWeight: 'bold' 
          }}
        >
          {value}
        </Typography>
      </Stack>
      <Typography variant="body2">
        {description}
      </Typography>
    </Box>
  );
}
