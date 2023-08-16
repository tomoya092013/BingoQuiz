import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { jwtTokenState } from '../store';
import { FallbackProps } from 'react-error-boundary';

const ErrorFallback = ({ error }: FallbackProps) => {
  console.log(error);
  const resetJwtToken = useResetRecoilState(jwtTokenState);
  const navigate = useNavigate();

  const goToLogin = () => {
    resetJwtToken();
    navigate('/');
  };

  return (
    <div>
      <Button onClick={() => goToLogin()}>ログイン画面に戻る</Button>
    </div>
  );
};

export default ErrorFallback;
