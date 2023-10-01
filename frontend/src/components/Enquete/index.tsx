import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slider,
  Stack,
  styled,
  Typography,
} from '@mui/material';

import { sendEnquete } from '../../hooks/sendEnquete';
import { guestInfoState } from '../../store';
import { EnqueteTotal, Guest } from '../../types';
import LogoutButton from '../LogoutButton';

const VerticalTypography = styled(Typography)({
  writingMode: 'vertical-lr',
  textOrientation: 'mixed',
  whiteSpace: 'nowrap',
});

const PrettoSlider = styled(Slider)({
  color: '#52af77',
  height: 8,
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
  },
});

const defaultEnqueteTotal = [
  { tomoya: 50, miki: 50 },
  { tomoya: 50, miki: 50 },
  { tomoya: 50, miki: 50 },
  { tomoya: 50, miki: 50 },
  { tomoya: 50, miki: 50 },
];
const ENQUETES = [
  '2人っきりの時に甘えてそうなのはどっち？',
  '喧嘩した時に「ごめんね」が言えなさそうなのはどっち？',
  'かわいいのはどっち？',
  '忘れん坊そうなのはどっち？',
  '友達の悩みを真剣に聞いてくれそうなのはどっち？',
];

const Enquete = () => {
  const [enqueteValue, setEnqueteValue] =
    useState<EnqueteTotal[]>(defaultEnqueteTotal);
  const [guestInfo, setGuestInfo] = useRecoilState(guestInfoState);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const onChangeSlider = (
    _event: Event,
    newValue: number | number[],
    index: number
  ) => {
    if (typeof newValue === 'number') {
      updateSliderValue(index, newValue);
    }
  };

  const updateSliderValue = (index: number, newValue: number) => {
    const newEnqueteValue = [...enqueteValue];
    newEnqueteValue[index].tomoya = newValue;
    newEnqueteValue[index].miki = 100 - newValue;
    setEnqueteValue(newEnqueteValue);
  };

  const onClickSend = () => {
    if (!guestInfo) return;
    sendEnquete(guestInfo.id, enqueteValue);
    localStorage.setItem('afterSend', guestInfo.id.toString());
    navigate('/loading');
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
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
    <>
      <Stack justifyContent="center" alignItems="center">
        <Box
          maxWidth="420px"
          sx={{
            backgroundImage: 'url("/images/enquete1.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            width: '100%',
          }}
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            width="100%"
            sx={{ gap: '20px' }}
          >
            <Stack justifyContent="center" alignItems="center" width="100%">
              <Box
                margin="15px"
                sx={{ color: '#fff', backgroundColor: '#0000005c' }}
              >
                <Stack justifyContent="center" alignItems="center">
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-around"
                    width="100%"
                    padding="10px"
                  >
                    <Typography variant="h4" fontWeight="bold">
                      アンケート
                    </Typography>
                    <LogoutButton />
                  </Stack>
                  <Typography variant="body1">
                    こっちだ！と思う方の数を増やして！！
                  </Typography>
                </Stack>
                <Stack justifyContent="center" alignItems="center">
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    width="80%"
                    margin="15px"
                  >
                    <VerticalTypography variant="h4" fontWeight="bold">
                      ともや
                    </VerticalTypography>
                    <VerticalTypography variant="h4" fontWeight="bold">
                      みき
                    </VerticalTypography>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
            <Stack justifyContent="center" alignItems="center" marginTop="15px">
              {ENQUETES.map((enquete, index) => (
                <Stack
                  key={index}
                  justifyContent="center"
                  alignItems="flex-start"
                  width="80%"
                >
                  <Typography>{enquete}</Typography>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    sx={{ gap: '10px' }}
                  >
                    <Typography
                      variant="h5"
                      color="#00b2ff"
                      fontWeight="bold"
                      marginRight="10px"
                    >
                      {enqueteValue[index].tomoya}
                    </Typography>
                    <PrettoSlider
                      track={false}
                      value={enqueteValue[index].tomoya}
                      onChange={(e, newValue) =>
                        onChangeSlider(e, newValue, index)
                      }
                    />
                    <Typography
                      variant="h5"
                      color="#fe9bff"
                      fontWeight="bold"
                      marginLeft="10px"
                    >
                      {enqueteValue[index].miki}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
            <Stack
              justifyContent="center"
              alignItems="center"
              marginTop="15px"
              sx={{
                backgroundImage: 'url("/images/enquete2.jpg")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                height: '190px',
                width: '100%',
              }}
            >
              <Button
                variant="contained"
                sx={{
                  padding: '5px',
                  width: '60%',
                  borderRadius: '20px',
                  backgroundColor: '#1976d2a1',
                }}
                onClick={() => handleOpen()}
              >
                <Typography variant="h5">送信</Typography>
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <Dialog open={isOpen}>
        <DialogTitle>送信したら変更できません。よろしいですか？</DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={onClickSend}>
            イイよ！
          </Button>
          <Button variant="contained" onClick={handleClose} autoFocus>
            いやだ。
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Enquete;
