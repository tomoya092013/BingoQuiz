import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { Button, Grid, Stack, styled, Typography } from '@mui/material';

import { createGuestAnswer } from '../../../hooks/createGuestAnswer';
import { fetchGuestAnswer } from '../../../hooks/fetchGuestAnswer';
import { fetchQuizList } from '../../../hooks/fetchQuizList';
import { updateCorrectCount } from '../../../hooks/updateCorrectCount';
import { guestAnswerListState, quizListState } from '../../../store';
import { GuestAnswer, Quiz } from '../../../types';
import Image from '../image';
import SquareQuiz from './SquareQuiz';

type Props = {
  guestId: number;
  guestName: string;
};

const CustomTypography = styled(Typography)({
  width: '100px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: 'black',
});

const GuestBingoSheet = ({ guestId, guestName }: Props) => {
  const [quizList, setQuizList] = useRecoilState(quizListState);
  const [shuffleQuizList, setShuffleQuizList] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [guestAnswerList, setGuestAnswerList] =
    useRecoilState(guestAnswerListState);
  const [bingo, setBingo] = useState(false);
  const [shuffleDisabled, setShuffleDisabled] = useState(false);

  const onShuffleButton = (targetList: Quiz[]) => {
    const newQuizList = [...targetList];

    for (let i = newQuizList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newQuizList[i], newQuizList[j]] = [newQuizList[j], newQuizList[i]];
    }
    setShuffleQuizList(newQuizList);
  };

  const getQuizList = async () => {
    const quizList = await fetchQuizList();
    setQuizList(quizList);
    setShuffleQuizList(quizList);
    setIsLoading(false);
  };

  const getGuestAnswer = async () => {
    const res = await fetchGuestAnswer(guestId);
    if (res === undefined) {
      await createGuestAnswer(guestId, guestName);
    }
    const data: GuestAnswer = {
      guest_id: guestId,
      guest_name: guestName,
      1: res.question_1_select_mark,
      2: res.question_2_select_mark,
      3: res.question_3_select_mark,
      4: res.question_4_select_mark,
      5: res.question_5_select_mark,
      6: res.question_6_select_mark,
      7: res.question_7_select_mark,
      8: res.question_8_select_mark,
      9: res.question_9_select_mark,
      correct_count: res.correct_count,
    };
    console.log('data', data);
    setGuestAnswerList(data);
  };

  const questionNumber = (quizId: number) => {
    const questionNumber = guestAnswerList[quizId as keyof GuestAnswer] as
      | 'A'
      | 'B'
      | 'C';
    return questionNumber;
  };

  const updateShuffleQuiz = () => {
    if (shuffleQuizList.length === 0) return;

    const newShuffleQuizList = shuffleQuizList.map((shuffleQuiz) => ({
      ...shuffleQuiz,
      is_answer_opened: quizList[shuffleQuiz.id - 1].is_answer_opened,
    }));
    setShuffleQuizList(newShuffleQuizList);
  };

  const guestIsCollected = (quizNum: number) => {
    if (!shuffleQuizList[quizNum]) return;
    if (!shuffleQuizList[quizNum].is_answer_opened) return;
    const quizId = shuffleQuizList[quizNum].id;
    return (
      shuffleQuizList[quizNum].correct_mark ===
      (guestAnswerList[quizId as keyof GuestAnswer] as 'A' | 'B' | 'C')
    );
  };

  const judgeBingo = () => {
    let newBingoCount = 0;
    if (guestIsCollected(0) && guestIsCollected(1) && guestIsCollected(2)) {
      newBingoCount += 1;
    }
    if (guestIsCollected(3) && guestIsCollected(4) && guestIsCollected(5)) {
      newBingoCount += 1;
    }
    if (guestIsCollected(6) && guestIsCollected(7) && guestIsCollected(8)) {
      newBingoCount += 1;
    }

    if (guestIsCollected(0) && guestIsCollected(3) && guestIsCollected(6)) {
      newBingoCount += 1;
    }
    if (guestIsCollected(1) && guestIsCollected(4) && guestIsCollected(7)) {
      newBingoCount += 1;
    }
    if (guestIsCollected(2) && guestIsCollected(5) && guestIsCollected(8)) {
      newBingoCount += 1;
    }

    if (guestIsCollected(0) && guestIsCollected(4) && guestIsCollected(8)) {
      newBingoCount += 1;
    }
    if (guestIsCollected(2) && guestIsCollected(4) && guestIsCollected(6)) {
      newBingoCount += 1;
    }

    const judgeBingo = newBingoCount > 0;
    setBingo(judgeBingo);
  };

  const judgeCorrectCount = async () => {
    const createCorrectCount = () => {
      let newCorrectCount = 0;
      quizList.forEach((quiz, quizIndex) => {
        if (!quiz.is_answer_opened) return;

        const quizNum = quizIndex + 1;
        const isCorrect =
          quiz.correct_mark === guestAnswerList[quizNum as keyof GuestAnswer];
        if (isCorrect) {
          newCorrectCount += 1;
        }
      });
      return newCorrectCount;
    };
    const correctCount = await createCorrectCount();
    updateCorrectCount(guestAnswerList.guest_id, bingo, correctCount);
  };

  const shuffleButtonDisabled = () => {
    const isAnswerOpened =
      quizList.filter((quiz) => quiz.is_answer_opened).length > 0;
    setShuffleDisabled(isAnswerOpened);
  };

  const update = () => {
    getQuizList();
    getGuestAnswer();
  };

  useEffect(() => {
    getQuizList();
    getGuestAnswer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    judgeBingo();
    judgeCorrectCount();
    updateShuffleQuiz();
    shuffleButtonDisabled();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizList]);

  return (
    <>
      {isLoading === true ? (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          width={'100%'}
          height={'100vh'}
          fontSize={'40px'}
          color="black"
        >
          Loading...
        </Stack>
      ) : (
        <Stack
          alignItems="center"
          justifyContent="center"
          minHeight={'100vh'}
          width={'100%'}
        >
          {bingo && <Image />}
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ position: 'relative', margin: '10px 0' }}
          >
            <Button
              onClick={update}
              variant="contained"
              sx={{
                position: 'absolute',
                top: '20px',
                left: '280px',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
              }}
              style={{
                backgroundColor: '#0027ff',
                color: 'white',
                border: '2px solid black',
                padding: '0px',
                minWidth: '50px',
              }}
            >
              更新
            </Button>
            <img
              src="/images/bingoSheet.jpg"
              alt="bingoSheet"
              width={350}
              height={500}
            />
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{
                minWidth: '290px',
                minHeight: '290px',
                padding: '20px',
                position: 'absolute',
                top: '105px',
              }}
            >
              {shuffleQuizList.map((quiz) => (
                <Grid key={quiz.id} item xs={4}>
                  <SquareQuiz quiz={quiz} guestId={guestId} />
                </Grid>
              ))}
            </Grid>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              width={'100%'}
              sx={{ position: 'absolute', top: '395px' }}
            >
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  width: '250px',
                  height: '80px',
                  backgroundImage: 'url("/images/room.png")',
                  backgroundSize: 'cover',
                }}
              >
                <Button
                  style={{
                    width: '170px',
                    height: '50px',
                    background: shuffleDisabled ? 'red' : '#8861ff6b',
                    alignItems: 'center',
                    borderRadius: '40px',
                    border: 'solid 2px #040404',
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                  onClick={() => onShuffleButton(shuffleQuizList)}
                  disabled={shuffleDisabled}
                >
                  <Typography color="#FFF" fontWeight="bold" fontSize="24px">
                    シャンブルズ
                  </Typography>
                </Button>
              </Stack>
            </Stack>
          </Stack>
          <Typography variant="h6" sx={{ margin: '20px 0 10px 0' }}>
            問題一覧( ✌︎'ω')✌︎
          </Typography>
          {quizList.map((quiz) => (
            <Stack
              key={quiz.id}
              alignItems="center"
              justifyContent="flex-start"
              sx={{ margin: '5px' }}
            >
              <Stack
                justifyContent="center"
                sx={{
                  width: '330px',
                  padding: '2px 6px',
                  background: '#fff0cd',
                  boxShadow: '0px 0px 0px 3px #fff0cd',
                  border: 'dashed 2px black',
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ paddingLeft: 1, color: '#001692' }}
                >
                  {quiz.id}. {quiz.question_title}
                </Typography>
                <Stack direction="row" justifyContent="space-between">
                  {questionNumber(quiz.id) === 'A' ? (
                    <Stack direction="row">
                      <Stack
                        justifyContent="center"
                        alignItems="center"
                        minWidth="20px"
                        lineHeight="20px"
                        sx={{
                          borderRadius: '50%',
                          border: '2px solid #f10',
                          color: 'black',
                        }}
                      >
                        A
                      </Stack>
                      <CustomTypography variant="subtitle1">
                        .{quiz.option_a}
                      </CustomTypography>
                    </Stack>
                  ) : (
                    <CustomTypography variant="subtitle1">
                      A. {quiz.option_a}
                    </CustomTypography>
                  )}
                  {questionNumber(quiz.id) === 'B' ? (
                    <Stack direction="row">
                      <Stack
                        justifyContent="center"
                        alignItems="center"
                        minWidth="20px"
                        lineHeight="20px"
                        sx={{
                          borderRadius: '50%',
                          border: '2px solid #f10',
                          color: 'black',
                        }}
                      >
                        B
                      </Stack>
                      <CustomTypography variant="subtitle1">
                        .{quiz.option_b}
                      </CustomTypography>
                    </Stack>
                  ) : (
                    <CustomTypography variant="subtitle1">
                      B. {quiz.option_b}
                    </CustomTypography>
                  )}
                  {questionNumber(quiz.id) === 'C' ? (
                    <Stack direction="row">
                      <Stack
                        justifyContent="center"
                        alignItems="center"
                        minWidth="20px"
                        lineHeight="20px"
                        sx={{
                          borderRadius: '50%',
                          border: '2px solid #f10',
                          color: 'black',
                        }}
                      >
                        C
                      </Stack>
                      <CustomTypography variant="subtitle1">
                        .{quiz.option_c}
                      </CustomTypography>
                    </Stack>
                  ) : (
                    <CustomTypography variant="subtitle1">
                      C. {quiz.option_c}
                    </CustomTypography>
                  )}
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
};

export default GuestBingoSheet;
