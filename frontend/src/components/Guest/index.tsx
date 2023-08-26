import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { guestAnswerListState, guestInfoState } from '../../store';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GuestQuizList from './GuestBingoSheet';
import jwt_decode from 'jwt-decode';
import { Guest } from '../../types';

const GuestPage = () => {
  const [guestInfo, setGuestInfo] = useRecoilState(guestInfoState);
  const clearGuestInfo = useResetRecoilState(guestInfoState);
  const clearGuestAnswerList = useResetRecoilState(guestAnswerListState);
  const navigate = useNavigate();

  const logout = () => {
    const confirm = window.confirm('ログアウトしますか？');
    if (confirm) {
      clearGuestInfo();
      clearGuestAnswerList();
      localStorage.removeItem('jwtToken');
      navigate('/');
    }
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
    <Box bgcolor="#494949" color="#ffffff">
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        padding="20px"
      >
        {guestInfo.name} ID:{guestInfo.id}
        <Button onClick={() => logout()} variant="contained">
          ログアウト
        </Button>
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
            textShadow: '0 0 15px #000000',
          }}
        >
          みんなが知りたい
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            textShadow: '0 0 15px #000000',
          }}
        >
          9個の謎
        </Typography>
      </Stack>
      <GuestQuizList guestId={guestInfo.id} />
    </Box>
  );
};

export default GuestPage;
