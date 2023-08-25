import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { guestAnswerListState, guestInfoState } from '../../store';
import { Box, Button, Stack } from '@mui/material';
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
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!guestInfo) return navigate('/');

  return (
    <Box
      paddingTop="20px"
      sx={{
        backgroundColor: '#dfffea',
      }}
    >
      <Stack direction="row" justifyContent="space-around" alignItems="center">
        {guestInfo.name} ID:{guestInfo.id}
        <Button onClick={() => logout()} variant="contained">
          ログアウト
        </Button>
      </Stack>
      <GuestQuizList guestId={guestInfo.id} />
    </Box>
  );
};

export default GuestPage;
