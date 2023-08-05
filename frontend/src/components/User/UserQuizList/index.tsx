import { useEffect, useState } from 'react';
import { Quiz } from '../../../types';
import { Button, Grid, Stack, Typography, styled } from '@mui/material';
import SquareQuiz from './SquareQuiz';

const UserQuizList = () => {
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  const [shuffleQuizList, setShuffleQuizList] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const CustomTypography = styled(Typography)({
    width: '100px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });

  const onShuffleButton = (targetList: Quiz[]) => {
    const newQuizList = [...targetList];

    for (let i = newQuizList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newQuizList[i], newQuizList[j]] = [newQuizList[j], newQuizList[i]];
    }
    setShuffleQuizList(newQuizList);
  };

  const getQuizList = async () => {
    const res = await fetch('http://localhost:3000/quizzes');
    const json: Quiz[] = await res.json();
    setQuizList(json);
    setShuffleQuizList(json);
    setIsLoading(false);
  };

  useEffect(() => {
    getQuizList();
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
            sx={{
              backgroundColor: '#dfffea',
            }}
          >
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ padding: '20px 5px' }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  color: '#4875ff',
                  textShadow: '0 0 15px #FF6694',
                }}
              >
                みんなが知りたい
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  color: '#4875ff',
                  textShadow: '0 0 15px #FF6694',
                }}
              >
                9個の謎
              </Typography>
            </Stack>

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
                  width: '290px',
                  height: '290px',
                  padding: '20px',
                  position: 'absolute',
                  top: '105px',
                }}
              >
                {shuffleQuizList.map((quiz) => (
                  <Grid key={quiz.id} item xs={4}>
                    <SquareQuiz {...quiz} />
                  </Grid>
                ))}
              </Grid>
              <Button
                sx={{
                  position: 'absolute',
                  top: '410px',
                  width: '200px',
                  height: '50px',
                  fontSize: '24px',
                  background: '#ff8b61',
                  color: '#FFF',
                  fontWeight: 'bold',
                  boxShadow: '7px 13px 7px 2px #9e4700',
                  borderRadius: '40px',
                  border: 'solid 2px #040404',
                }}
                onClick={() => onShuffleButton(shuffleQuizList)}
              >
                シャッフル
              </Button>
            </Stack>

            <Typography variant="h5" sx={{ margin: '20px 0 10px 0' }}>
              問題一覧載せときま〜す
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
                    width: '80%',
                    minWidth: '330px',
                    padding: '2px 6px',
                    background: '#fff0cd',
                    boxShadow: '0px 0px 0px 3px #fff0cd',
                    border: 'dashed 2px black',
                  }}
                >
                  <Typography variant="h5" gutterBottom sx={{ paddingLeft: 1 }}>
                    {quiz.id}. {quiz.question_title}
                  </Typography>

                  <Stack direction="row" justifyContent="space-between">
                    <CustomTypography variant="subtitle1">
                      A. {quiz.option_a}
                    </CustomTypography>
                    <CustomTypography variant="subtitle1">
                      B. {quiz.option_b}
                    </CustomTypography>
                    <CustomTypography variant="subtitle1">
                      C. {quiz.option_c}
                    </CustomTypography>
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

export default UserQuizList;
