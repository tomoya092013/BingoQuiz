import { Box, Typography } from '@mui/material';

const Image = () => {
  return (
    <Box className="trimming">
      <Typography
        variant="h3"
        fontWeight="bold"
        color="#ffff00"
        sx={{
          position: 'absolute',
          top: '80px',
          left: '50px',
          letterSpacing: '3px',
        }}
      >
        BINGO!!
      </Typography>
      <img src="/images/bingo!.png" />
    </Box>
  );
};

export default Image;
