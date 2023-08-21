import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { jwtTokenState } from '../store';
import { FallbackProps } from 'react-error-boundary';

const ErrorFallback = ({ error }: FallbackProps) => {
  console.log(error);
  const resetJwtToken = useResetRecoilState(jwtTokenState);
  const navigate = useNavigate();

  const goToLogin = async () => {
    resetJwtToken();
    navigate('/');
    window.location.reload();
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
      bgcolor="black"
      color="white"
    >
      <Typography variant="h6">すみません、エラーです。</Typography>
      <Typography variant="h6">ログイン画面に戻ってください。</Typography>
      <Button
        variant="contained"
        onClick={() => goToLogin()}
        sx={{ margin: '20px' }}
      >
        ログイン画面に戻る
      </Button>
    </Stack>
  );
};

export default ErrorFallback;
