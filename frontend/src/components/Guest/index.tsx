import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { Box, Stack, Typography } from '@mui/material';

import { guestInfoState } from '../../store';
import { Guest } from '../../types';
import LogoutButton from '../LogoutButton';
import Dog from './DogsKatakuriSpeak';
import GuestQuizList from './GuestBingoSheet';

const GuestPage = () => {
  const [guestInfo, setGuestInfo] = useRecoilState(guestInfoState);
  const navigate = useNavigate();

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
      >
        {guestInfo.name} ID:{guestInfo.id}
        <LogoutButton />
      </Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ padding: '20px 5px' }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
          }}
        >
          みんなが知りたい！
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
          }}
        >
          智也 と 実希 のこと
        </Typography>
      </Stack>
      <GuestQuizList guestId={guestInfo.id} />
      <Dog />
    </Box>
  );
};

export default GuestPage;
