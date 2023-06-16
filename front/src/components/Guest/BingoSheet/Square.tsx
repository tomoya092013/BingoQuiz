import { Box, Grid } from '@mui/material';
import React from 'react';

const Square = () => {
  return (
    <Grid item xs={4} justifyContent="center" alignItems="center">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        width={80}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            bgcolor: 'red',
            boxShadow: 1,
            borderRadius: 2,
            width: 80,
            height: 80,
          }}
        ></Box>
      </Grid>
    </Grid>
  );
};

export default Square;
