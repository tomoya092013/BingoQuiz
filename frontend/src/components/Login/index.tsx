import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Stack, TextField, Typography } from '@mui/material';

import { Guest } from '../../types';

const Login = () => {
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const guestLoginRequest = async () => {
    const res = await fetch(
      `https://${import.meta.env.VITE_API_URL}/login/${password}`
    );
    const jwtToken = await res.text();
    localStorage.setItem('jwtToken', jwtToken);

    if (jwtToken === ' ') {
      alert('違う！！');
      return;
    }

    const guestId = localStorage.getItem('afterSend');
    const guestInfo: Guest = jwt_decode(jwtToken);

    if (guestId === guestInfo.id.toString()) {
      navigate('/guest');
    } else {
      navigate('/enquete');
    }
  };

  const onLoginButton = () => {
    if (password === '') return;
    if (password === '管理者') {
      navigate('admin/quizList');
      return;
    }
    guestLoginRequest();
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={5}
      sx={{
        width: '100%',
        height: '100vh',
        backgroundImage: 'url("/images/loginPage.jpg")',
      }}
    >
      <Stack
        alignItems="center"
        sx={{
          width: '70%',
          maxWidth: '400px',
          backgroundColor: '#feffe9',
          borderRadius: '10px',
          padding: '5px 8px',
          boxShadow: '0px 0px 0px 10px #feffc6',
          border: 'dashed 3px #ffc3c3',
        }}
      >
        <Typography variant="h5">ログインパスワードを</Typography>
        <Typography variant="h5" gutterBottom>
          入力してください
        </Typography>
        <Typography variant="subtitle1">
          入力したらピッピを押してください
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ width: '80%', maxWidth: '400px' }}
      >
        <TextField
          label="パスワード"
          variant="outlined"
          sx={{
            lineHeight: '60px',
            backgroundColor: '#feffe9',
            borderRadius: '10px',
            border: 'double 10px #959300',
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={() => onLoginButton()}>
          <img
            src="/images/pokemonDotto.gif"
            alt="pippi"
            width={65}
            height={65}
          />
        </Button>
      </Stack>
    </Stack>
  );
};

export default Login;
