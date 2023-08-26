import { Avatar, Button, Stack, Typography } from '@mui/material';
import { GuestAnswer, Quiz, WsAdminAnswer } from '../../../../types';
import { useEffect, useState } from 'react';
import ModalSquareQuiz from './modal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { guestAnswerListState, quizListState } from '../../../../store';
import { fetchQuizList } from '../../../../hooks/fetchQuizList';

type Props = {
  quiz: Quiz;
  guestId: number;
};

const SquareQuiz = ({ quiz, guestId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quizList, setQuizList] = useRecoilState(quizListState);
  const guestAnswerList = useRecoilValue(guestAnswerListState);
  const [wsData, setWsData] = useState<WsAdminAnswer>({
    quizId: 0,
    answer: '',
  });

  const openChoiceModal = () => {
    setIsOpen(true);
  };
  const closeChoiceModal = () => setIsOpen(false);

  const isSelectedAnswer = (quizId: number) => {
    const selectedMark = guestAnswerList[quizId as keyof GuestAnswer] as
      | 'A'
      | 'B'
      | 'C';
    const isSelected =
      selectedMark === 'A' || selectedMark === 'B' || selectedMark === 'C';
    return isSelected;
  };

  const getQuizList = async () => {
    const quizList = await fetchQuizList();
    setQuizList(quizList);
  };

  const guestIsCollected = (quizId: number) => {
    if (!quizList[quizId - 1].is_answer_opened) return;
    return (
      quizList[quizId - 1].correct_mark ===
      (guestAnswerList[quizId as keyof GuestAnswer] as 'A' | 'B' | 'C')
    );
  };

  useEffect(() => {
    isSelectedAnswer(quiz.id);
    getQuizList();

    const ws = new WebSocket('ws://localhost:3000/cable');
    ws.onopen = () => {
      console.log('Connected to websocket server');
      ws.send(
        JSON.stringify({
          command: 'subscribe',
          identifier: JSON.stringify({
            id: `${guestId}`,
            channel: 'MessagesChannel',
          }),
        })
      );
    };
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === 'ping') return;
      if (data.type === 'welcome') return;
      if (data.type === 'confirm_subscription') return;
      const perseData: WsAdminAnswer = JSON.parse(data.message.body);
      setWsData(perseData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newQuizList = quizList.map((quiz) =>
      quiz.id === wsData.quizId ? { ...quiz, is_answer_opened: true } : quiz
    );
    setQuizList(newQuizList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsData]);

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
          {quizList[quiz.id - 1].is_answer_opened ? (
            guestIsCollected(quiz.id) ? (
              <Avatar
                alt="punch"
                src="/images/punch.jpg"
                sx={{
                  width: 70,
                  height: 70,
                }}
              />
            ) : (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  bgcolor: '#00000085',
                  width: '75px',
                  height: '75px',
                  borderRadius: '10px',
                }}
              >
                <Typography variant="h4">{quiz.id}</Typography>
                {isSelectedAnswer(quiz.id) && (
                  <Typography variant="h4">
                    .{guestAnswerList[`${quiz.id}` as keyof GuestAnswer]}
                  </Typography>
                )}
              </Stack>
            )
          ) : (
            <Button onClick={() => openChoiceModal()}>
              <Typography variant="h4">{quiz.id}</Typography>
              {isSelectedAnswer(quiz.id) && (
                <Typography variant="h4">
                  .{guestAnswerList[`${quiz.id}` as keyof GuestAnswer]}
                </Typography>
              )}
            </Button>
          )}
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
