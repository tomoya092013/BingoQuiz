import React from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { jwtTokenState, guestInfoSelector } from '../../store';
import { Box, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GuestQuizList from './GuestQuizList';

const Guest: React.FC = () => {
  const resetJwtToken = useResetRecoilState(jwtTokenState);
  const guest = useRecoilValue(guestInfoSelector);
  const navigate = useNavigate();

  const logout = () => {
    const confirm = window.confirm('ログアウトしますか？');
    if (confirm) {
      resetJwtToken();
      navigate('/');
    }
  };

  if (!guest) navigate('/');

  return (
    <Box
      paddingTop="20px"
      sx={{
        backgroundColor: '#dfffea',
      }}
    >
      <Stack direction="row" justifyContent="space-around" alignItems="center">
        {guest.name} ID:{guest.id}
        <Button onClick={() => logout()} variant="contained">
          ログアウト
        </Button>
      </Stack>
      <GuestQuizList guestId={guest.id} />
    </Box>
  );
};

export default Guest;
