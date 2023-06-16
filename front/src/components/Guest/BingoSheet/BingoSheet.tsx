import { Box, Grid } from '@mui/material';
import React from 'react';
import Square from './Square';

const BingoSheet = () => {
  const bingoSheet = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div>
      <Grid container width={350}>
        {bingoSheet.map((sheet) => (
          <Square key={sheet} />
        ))}
      </Grid>
    </div>
  );
};

export default BingoSheet;
