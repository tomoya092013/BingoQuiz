import { useEffect, useState } from 'react';
import { Quiz, GuestAnswer } from '../../../types';
import { Box, Grid, Stack, Typography, styled } from '@mui/material';
import SquareQuiz from './SquareQuiz';
import { fetchQuizList } from '../../../hooks/fetchQuizList';
import { fetchGuestAnswer } from '../../../hooks/fetchGuestAnswer';
import { useRecoilState } from 'recoil';
import { guestAnswerListState, quizListState } from '../../../store';
import { createGuestAnswer } from '../../../hooks/createGuestAnswer';

type Props = {
  guestId: number;
};

const CustomTypography = styled(Typography)({
  width: '100px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: 'black',
});

const GuestBingoSheet = ({ guestId }: Props) => {
  const [quizList, setQuizList] = useRecoilState(quizListState);
  const [shuffleQuizList, setShuffleQuizList] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [guestAnswerList, setGuestAnswerList] =
    useRecoilState(guestAnswerListState);

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
      await createGuestAnswer(guestId);
    }
    const data: GuestAnswer = {
      guestId: guestId,
      1: res.question_1_select_mark,
      2: res.question_2_select_mark,
      3: res.question_3_select_mark,
      4: res.question_4_select_mark,
      5: res.question_5_select_mark,
      6: res.question_6_select_mark,
      7: res.question_7_select_mark,
      8: res.question_8_select_mark,
      9: res.question_9_select_mark,
    };
    setGuestAnswerList(data);
  };

  const questionNumber = (quizId: number) => {
    const questionNumber = guestAnswerList[quizId as keyof GuestAnswer] as
      | 'A'
      | 'B'
      | 'C';
    return questionNumber;
  };

  useEffect(() => {
    getQuizList();
    getGuestAnswer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <>
          <Stack
            alignItems="center"
            justifyContent="center"
            minHeight={'100vh'}
            width={'100%'}
          >
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ position: 'relative', margin: '10px 0' }}
            >
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
                <Box
                  sx={{
                    width: '160px',
                    height: '50px',
                    fontSize: '24px',
                    background: '#ff8b61',
                    alignItems: 'center',
                    color: '#FFF',
                    fontWeight: 'bold',
                    boxShadow: '7px 13px 7px 2px #9e4700',
                    borderRadius: '40px',
                    border: 'solid 2px #040404',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                  onClick={() => onShuffleButton(shuffleQuizList)}
                >
                  シャンブルズ
                </Box>

                <img
                  src="/images/room.png"
                  alt="room"
                  style={{
                    borderRadius: '10px',
                    width: '120px',
                    height: '80px',
                  }}
                />
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
        </>
      )}
    </>
  );
};

export default GuestBingoSheet;
