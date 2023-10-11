import { ReactNode } from 'react';

import { Stack, Typography } from '@mui/material';

type Props = {
  name?: string;
  speak: string;
  icon: string;
  time?: string;
  kidoku?: string;
  children?: ReactNode;
};
const RightSpeak = ({ name, speak, icon, time, kidoku, children }: Props) => {
  return (
    <Stack alignItems="flex-end" margin="10px">
      <Stack direction="row" justifyContent="center" alignItems="flex-start">
        <Stack direction="row" justifyContent="center" alignItems="flex-end">
          <Stack>
            <Typography fontSize="8px" paddingRight="5px">
              {time}
            </Typography>
            {kidoku ? (
              <Typography fontSize="8px" paddingRight="5px">
                {kidoku}
              </Typography>
            ) : (
              <></>
            )}
          </Stack>
          <Stack alignItems="flex-end" marginRight="10px" sx={{ gap: '2px' }}>
            <Typography fontSize="8px">{name}</Typography>

            <Typography
              fontSize="18px"
              maxWidth="170px"
              sx={{
                backgroundColor: '#94ff94',
                padding: '8px 16px',
                borderRadius: '30px',
              }}
            >
              {speak}
              {children}
            </Typography>
          </Stack>
        </Stack>
        <img
          src={icon}
          style={{ borderRadius: '50%', width: '100px', height: '100px' }}
        />
      </Stack>
    </Stack>
  );
};

export default RightSpeak;
