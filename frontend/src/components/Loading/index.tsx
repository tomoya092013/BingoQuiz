import { Box, Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const Loading = () => {
  const LoadingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

  const Loading = styled(Box)`
    position: absolute;
    border: 3px solid #00ff3d;
    width: 100%;
    height: 100%;
    animation: ${LoadingAnimation} 5s linear infinite;
  `;

  const LoadingReverse = styled(Box)`
    position: absolute;
    border: 3px solid #00ff3d;
    width: 100%;
    height: 100%;
    animation: ${LoadingAnimation} 5s linear infinite reverse;
  `;

  const LoadingDelay = styled(Box)`
    position: absolute;
    border: 3px solid #00ff3d;
    width: 100%;
    height: 100%;
    animation: ${LoadingAnimation} 3s linear infinite;
  `;

  return (
    <Stack
      width="100%"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: '#222', color: '#fff' }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          position: 'relative',
          width: '250px',
          height: '250px',
        }}
      >
        <Loading
          sx={{
            borderRadius: '32% 68% 11% 89% / 63% 32% 68% 37%',
          }}
        ></Loading>
        <LoadingReverse
          sx={{
            borderRadius: '32% 68% 11% 89% / 63% 32% 68% 37%',
          }}
        ></LoadingReverse>
        <LoadingDelay
          sx={{
            borderRadius: '43% 57% 55% 45% / 82% 60% 40% 18%',
          }}
        ></LoadingDelay>
        <Typography variant="h4">Now Loading...</Typography>
      </Stack>
    </Stack>
  );
};

export default Loading;
