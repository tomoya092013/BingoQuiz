import { Button, Stack, Typography } from '@mui/material';
import { Quiz } from '../../../../types';
import { useState } from 'react';
import ModalSquareQuiz from './modal';

const SquareQuiz = (quiz: Quiz) => {
  const [isOpen, setIsOpen] = useState(false);
  const openChoiceModal = () => setIsOpen(true);
  const closeChoiceModal = () => setIsOpen(false);

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
          <Button onClick={() => openChoiceModal()}>
            <Typography variant="h4">{quiz.id}</Typography>
          </Button>
        </Stack>
      </Stack>
      <ModalSquareQuiz
        quiz={quiz}
        isOpen={isOpen}
        closeChoiceModal={closeChoiceModal}
      />
    </>
  );
};

export default SquareQuiz;
