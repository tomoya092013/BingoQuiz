import { Button, Stack, Typography } from '@mui/material';
import { GuestAnswer, Quiz } from '../../../../types';
import { useEffect, useState } from 'react';
import ModalSquareQuiz from './modal';
import { useRecoilValue } from 'recoil';
import { guestAnswerListState } from '../../../../store';

type Props = {
  quiz: Quiz;
};

const SquareQuiz = ({ quiz }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const openChoiceModal = () => {
    setIsOpen(true);
  };
  const closeChoiceModal = () => setIsOpen(false);
  const guestAnswerList = useRecoilValue(guestAnswerListState);

  const isSelectedAnswer = (quizId: number) => {
    const selectedMark = guestAnswerList[quizId as keyof GuestAnswer] as
      | 'A'
      | 'B'
      | 'C';
    const isSelected =
      selectedMark === 'A' || selectedMark === 'B' || selectedMark === 'C';
    return isSelected;
  };

  useEffect(() => {
    isSelectedAnswer(quiz.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(isSelectedAnswer(quiz.id));

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
            {isSelectedAnswer(quiz.id) && (
              <Typography variant="h4">
                .{guestAnswerList[`${quiz.id}` as keyof GuestAnswer]}
              </Typography>
            )}
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
