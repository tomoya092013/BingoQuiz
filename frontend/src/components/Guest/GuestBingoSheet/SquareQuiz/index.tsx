import { Avatar, Button, Stack, Typography } from '@mui/material';
import { GuestAnswer, Quiz, WsAdminAnswer } from '../../../../types';
import { useEffect, useState } from 'react';
import ModalSquareQuiz from './modal';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  guestAnswerListState,
  quizListState,
  wsAdminAnswerState,
} from '../../../../store';
import { fetchQuizList } from '../../../../hooks/fetchQuizList';

type Props = {
  quiz: Quiz;
  guestId: number;
};

const ws = new WebSocket('ws://localhost:3000/cable');

const SquareQuiz = ({ quiz, guestId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quizList, setQuizList] = useRecoilState(quizListState);
  const guestAnswerList = useRecoilValue(guestAnswerListState);
  const [wsAdminAnswerList, setWsAdminAnswerList] =
    useRecoilState(wsAdminAnswerState);

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

  useEffect(() => {
    isSelectedAnswer(quiz.id);
    getQuizList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    updateAdminAnswerList(perseData);
  };

  const updateAdminAnswerList = (data: WsAdminAnswer) => {
    const updatedList = wsAdminAnswerList.map((adminAnswer) =>
      adminAnswer.quizId === data.quizId
        ? { ...adminAnswer, answer: data.answer }
        : adminAnswer
    );
    setWsAdminAnswerList(updatedList);
  };

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
            <Avatar
              alt="punch"
              src="/images/punch.jpg"
              sx={{
                width: 70,
                height: 70,
              }}
            />
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
