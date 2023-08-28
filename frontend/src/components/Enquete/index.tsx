import { Box, Button, Slider, Stack, Typography, styled } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useEffect, useState } from 'react';
import { EnqueteTotal, Guest } from '../../types';
import jwt_decode from 'jwt-decode';
import { guestInfoState } from '../../store';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { sendEnquete } from '../../hooks/sendEnquete';

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
    navigate('/guest');
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
    <Stack justifyContent="center" alignItems="center" width="100%">
      <Box
        maxWidth="400px"
        sx={{
          backgroundImage: 'url("/images/enquete1.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          width: '100%',
        }}
      >
        <Stack justifyContent="center" alignItems="center" width="100%">
          <Box
            margin="15px"
            sx={{ color: '#fff', backgroundColor: '#0000005c' }}
          >
            <Stack justifyContent="center" alignItems="center">
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                アンケート
                <TwitterIcon fontSize="large" sx={{ color: 'pink' }} />
              </Typography>
              <Typography variant="body1">
                こっちだ！と思う方に 動かしてください！！
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
                <Typography variant="h5" color="#00b2ff" fontWeight="bold">
                  {enqueteValue[index].tomoya}
                </Typography>
                <PrettoSlider
                  track={false}
                  value={enqueteValue[index].tomoya}
                  onChange={(e, newValue) => onChangeSlider(e, newValue, index)}
                />
                <Typography variant="h5" color="#fe9bff" fontWeight="bold">
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
            onClick={() => onClickSend()}
          >
            <Typography variant="h5">送信</Typography>
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Enquete;
