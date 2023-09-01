import { Button, Typography } from '@mui/material';
import { guestAnswerListState, guestInfoState } from '../../store';
import { useResetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import TwitterIcon from '@mui/icons-material/Twitter';

const LogoutButton = () => {
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

  return (
    <Button
      onClick={() => logout()}
      size="small"
      sx={{ backgroundColor: '#00ff4f87', color: '#ffffff' }}
    >
      <TwitterIcon sx={{ color: 'pink' }} />
      <Typography fontWeight="bold">ログアウト</Typography>
    </Button>
  );
};

export default LogoutButton;
