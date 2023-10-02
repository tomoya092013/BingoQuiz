import { Stack, Typography } from '@mui/material';

type Props = {
  speak: string;
  time: string;
};
const KatakuriSpeak = ({ speak, time }: Props) => {
  return (
    <Stack alignItems="flex-end" margin="10px">
      <Stack direction="row" justifyContent="center" alignItems="flex-start">
        <Stack direction="row" justifyContent="center" alignItems="flex-end">
          <Stack>
            <Typography fontSize="8px" paddingRight="5px">
              {time}
            </Typography>
            <Typography fontSize="8px" paddingRight="5px">
              既読 3
            </Typography>
          </Stack>
          <Typography
            fontSize="18px"
            maxWidth="170px"
            sx={{
              backgroundColor: '#94ff94',
              margin: '10px 10px 0px 0px',
              padding: '8px 16px',
              borderRadius: '30px',
            }}
          >
            {speak}
          </Typography>
        </Stack>
        <img
          src="/public/images/katakuri.png"
          style={{ borderRadius: '50%', width: '100px', height: '100px' }}
        />
      </Stack>
    </Stack>
  );
};

export default KatakuriSpeak;
