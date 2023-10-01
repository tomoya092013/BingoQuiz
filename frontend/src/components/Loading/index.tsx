import { SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Input,
  Stack,
  Typography,
} from '@mui/material';

const Loading = () => {
  const [password, setPassword] = useState('');
  const [alertModal, setAlertModal] = useState(false);
  const navigate = useNavigate();

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

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
  };

  const clickButton = () => {
    if (password !== '宝物') {
      setAlertModal(true);
      return;
    }
    navigate('/guest');
  };

  return (
    <Stack
      width="100%"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: '#222', color: '#fff', position: 'relative' }}
    >
      <Stack alignItems="center" justifyContent="center">
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
        <Stack
          alignItems="center"
          justifyContent="center"
          marginTop="10px"
          sx={{ gap: '20px' }}
        >
          <Typography variant="h6">指示があるまでお待ちください。</Typography>
          <Input
            value={password}
            onChange={handleInputChange}
            inputProps={{
              style: {
                textAlign: 'center',
              },
            }}
            sx={{
              color: 'white',
              fontSize: '24px',
              width: '150px',
            }}
          />
        </Stack>
      </Stack>
      {password && (
        <Button
          onClick={clickButton}
          sx={{
            backgroundColor: 'white',
            position: 'fixed',
            bottom: '10%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '8px 20px',
          }}
        >
          <Typography variant="h6">ボタン</Typography>
        </Button>
      )}
      <Dialog open={alertModal} onClose={() => setAlertModal(false)}>
        <DialogTitle sx={{ padding: '30px', border: '8px outset red' }}>
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ gap: '10px' }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              適当に打っても無駄ですよ？ ﾜｵ〜ﾝ泣
            </Typography>
            <img src="/images/alertModal.jpg" alt="alertModal" />
          </Stack>
        </DialogTitle>
      </Dialog>
    </Stack>
  );
};

export default Loading;
