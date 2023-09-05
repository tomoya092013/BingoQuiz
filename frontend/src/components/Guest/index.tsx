import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { guestInfoState } from '../../store';
import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GuestQuizList from './GuestBingoSheet';
import jwt_decode from 'jwt-decode';
import { Guest } from '../../types';
import LogoutButton from '../LogoutButton';

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
    <>
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
    </>
  );
};

export default GuestPage;
