import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { Quiz } from '../../../types';

const QuizList = () => {
  useEffect(() => {
    getQuizList();
  }, []);

  const navigate = useNavigate();
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getQuizList = async () => {
    const res = await fetch('http://localhost:3001/quizzes');
    const json: Quiz[] = await res.json();
    setQuizList(json);
    setIsLoading(false);
  };

  const navigateEditQuiz = (id: number) => {
    navigate(`/admin/editQuiz/${id}`, { state: { quiz: quizList[id - 1] } });
  };

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
          <Grid
            container
            direction="row"
            justifyContent="center"
            minHeight={'100vh'}
            sx={{
              backgroundColor: '#eaffce',
            }}
          >
            <Box sx={{ p: 10, mt: 5 }}>
              <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
              >
                <Typography variant="h4">問題一覧</Typography>
              </Grid>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={3}
                marginTop={2}
              >
                {quizList.map((quiz) => (
                  <Grid key={quiz.id} item xs={10} md={4}>
                    <Paper
                      elevation={24}
                      sx={{
                        backgroundColor: '#ccf5ff',
                        borderRadius: 10,
                        border: 2,
                        padding: 1,
                        '&:hover': {
                          backgroundColor: '#b9ffc0',
                        },
                      }}
                      onClick={() => navigateEditQuiz(quiz.id)}
                    >
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ paddingLeft: 1 }}
                      >
                        {quiz.question_title}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ paddingLeft: 2 }}>
                        A. {quiz.option_a}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ paddingLeft: 2 }}>
                        B. {quiz.option_b}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ paddingLeft: 2 }}>
                        C. {quiz.option_c}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </>
      )}
    </>
  );
};

export default QuizList;
