import { Stack, Typography } from '@mui/material';
import { Quiz } from '../../../../types';

const SquareQuiz = (quiz: Quiz) => {
  return (
    <>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            bgcolor: 'white',
            width: '75px',
            height: '75px',
            borderRadius: '10px',
          }}
        >
          <Typography variant="h4">{quiz.id}</Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default SquareQuiz;
