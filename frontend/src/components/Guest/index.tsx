import jwt_decode from 'jwt-decode';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { Box, Button, Stack, styled, Typography } from '@mui/material';

import { guestInfoState } from '../../store';
import { Guest } from '../../types';
import LogoutButton from '../LogoutButton';
import DogsKatakuriSpeak from './DogsKatakuriSpeak';
import GuestQuizList from './GuestBingoSheet';

export const StyledTypography = styled(Typography)({
  fontSize: '28px',
  fontWeight: 'bold',
});

const GuestPage = () => {
  const [guestInfo, setGuestInfo] = useRecoilState(guestInfoState);
  const navigate = useNavigate();

  const scrollToDescription = useRef<HTMLDivElement | null>(null);
  const scrollToTop = useRef<HTMLDivElement | null>(null);

  const ScrollDescription = () => {
    scrollToDescription?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const ScrollTop = () => {
    scrollToTop?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (localStorage['jwtToken']) {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        const guestInfo: Guest = jwt_decode(token);
        setGuestInfo(guestInfo);
      } else {
        navigate('/');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!guestInfo) return <></>;

  return (
    <Box sx={{ gap: '10px' }}>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        padding="20px"
        ref={scrollToTop}
      >
        {guestInfo.name} ID:{guestInfo.id}
        <LogoutButton />
      </Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ padding: '20px 5px' }}
      >
        <StyledTypography>みんなが知りたい！</StyledTypography>
        <Stack direction="row">
          <StyledTypography color="#03a9f4">智也</StyledTypography>
          <StyledTypography>と</StyledTypography>
          <StyledTypography color="#ff6798">実希</StyledTypography>
          <StyledTypography>のこと！</StyledTypography>
        </Stack>
        <Button
          variant="contained"
          onClick={ScrollDescription}
          sx={{ marginTop: '15px' }}
        >
          ここを押して！
        </Button>
      </Stack>
      <GuestQuizList guestId={guestInfo.id} />
      <Stack
        ref={scrollToDescription}
        justifyContent="center"
        alignItems="center"
      >
        <DogsKatakuriSpeak ScrollTop={ScrollTop} />
      </Stack>
    </Box>
  );
};

export default GuestPage;
