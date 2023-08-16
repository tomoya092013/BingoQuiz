import React from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { jwtTokenState, userInfoSelector } from '../../store';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserQuizList from './UserQuizList';

const User: React.FC = () => {
  const user = useRecoilValue(userInfoSelector);
  const resetJwtToken = useResetRecoilState(jwtTokenState);
  const navigate = useNavigate();

  const logout = () => {
    const confirm = window.confirm('ログアウトしますか？');
    if (confirm) {
      resetJwtToken();
      navigate('/');
    }
  };

  if (!user) navigate('/');

  return (
    <>
      名前:{user.name} ID:{user.id}
      <Button onClick={() => logout()} variant="contained">
        ログアウト
      </Button>
      <UserQuizList />
    </>
  );
};

export default User;
