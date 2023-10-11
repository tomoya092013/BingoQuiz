import { Button, Stack, SxProps, Typography } from '@mui/material';

type Props = {
  name?: string;
  speak?: string;
  icons: string[];
  time?: string;
  onClick?: () => void;
  sx?: SxProps;
};
const LeftSpeak = ({ name, speak, icons, time, onClick, sx }: Props) => {
  return (
    <Stack alignItems="flex-start" margin="10px" sx={sx}>
      {icons.length === 1 ? (
        <Stack direction="row" justifyContent="center" alignItems="flex-start">
          {icons.map((icon) => (
            <>
              <img
                src={icon}
                style={{
                  borderRadius: '50%',
                  width: icons.length === 1 ? '100px' : '60px',
                  height: icons.length === 1 ? '100px' : '60px',
                }}
              />
            </>
          ))}
          <Stack direction="row" justifyContent="center" alignItems="flex-end">
            <Stack
              alignItems="flex-start"
              marginLeft="10px"
              sx={{ gap: '2px' }}
            >
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
                {onClick ? (
                  <Button onClick={onClick}>
                    <Typography
                      align="left"
                      fontSize="18px"
                      sx={{ color: name === 'ジン' ? 'black' : 'blue' }}
                    >
                      {speak}
                    </Typography>
                  </Button>
                ) : (
                  <>{speak}</>
                )}
              </Typography>
            </Stack>
            <Typography fontSize="8px" paddingLeft="5px">
              {time}
            </Typography>
          </Stack>
        </Stack>
      ) : (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Stack direction="row" sx={{ gap: '5px' }}>
            {icons.map((icon) => (
              <img
                src={icon}
                style={{
                  borderRadius: '50%',
                  width: icons.length === 1 ? '100px' : '90px',
                  height: icons.length === 1 ? '100px' : '90px',
                }}
              />
            ))}
          </Stack>
          <Stack direction="row" justifyContent="center" alignItems="flex-end">
            <Stack
              alignItems="flex-start"
              marginLeft="10px"
              sx={{ gap: '2px' }}
            >
              <Typography fontSize="8px">{name}</Typography>
              <Typography
                fontSize="18px"
                maxWidth="300px"
                sx={{
                  backgroundColor: '#ffffff',
                  padding: '8px 16px',
                  borderRadius: '30px',
                }}
              >
                {onClick ? (
                  <Button onClick={onClick}>
                    <Typography
                      align="left"
                      fontSize="18px"
                      sx={{ color: name === 'ジン' ? 'black' : 'blue' }}
                    >
                      {speak}
                    </Typography>
                  </Button>
                ) : (
                  <>{speak}</>
                )}
              </Typography>
            </Stack>
            <Typography fontSize="8px" paddingLeft="5px">
              {time}
            </Typography>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default LeftSpeak;
