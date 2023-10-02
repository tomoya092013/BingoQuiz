import { Stack, Typography } from '@mui/material';

type Props = {
  name: string;
  speak: string;
  icon: string;
  time: string;
};
const DogsSpeak = ({ name, speak, icon, time }: Props) => {
  return (
    <Stack alignItems="flex-start" margin="10px">
      <Stack direction="row" justifyContent="center" alignItems="flex-start">
        <img
          src={icon}
          style={{ borderRadius: '50%', width: '100px', height: '100px' }}
        />
        <Stack direction="row" justifyContent="center" alignItems="flex-end">
          <Stack alignItems="flex-start" marginLeft="10px" sx={{ gap: '2px' }}>
            <Typography fontSize="8px">{name}</Typography>
            <Typography
              fontSize="18px"
              maxWidth="170px"
              sx={{
                backgroundColor: '#ffffff',
                padding: '8px 16px',
                borderRadius: '30px',
              }}
            >
              {speak}
            </Typography>
          </Stack>
          <Typography fontSize="8px" paddingLeft="5px">
            {time}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DogsSpeak;
