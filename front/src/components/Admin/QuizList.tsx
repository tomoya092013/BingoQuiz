import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Box, Button, Grid, Stack, Typography } from '@mui/material';

type Quiz = {
  id: number;
  no: number;
  content: string;
  correct_mark: string;
  is_ancer_opened: boolean;
  created_at: Date;
  updated_at: Date;
};

const QuizList = () => {
  useEffect(() => {
    getQuizList();
  }, []);

  const MAX_QUIZ_COUNT = 9;
  const navigate = useNavigate();
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const lastQuizNo = quizList.length;

  const getQuizList = async () => {
    setIsLoading(true);
    const res = await fetch('http://localhost:3001/quizzes');
    const json: Quiz[] = await res.json();
    setQuizList(json);
    setIsLoading(false);
  };

  const deleteQuiz = async (id: number) => {
    await fetch(`http://localhost:3001/quizzes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    getQuizList();
  };

  const navigateCreateQuiz = () => {
    navigate('/admin/createQuiz');
  };

  const navigateEditQuiz = (id: number) => {
    navigate(`/admin/editQuiz/${id}`);
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
          <Button>
            <Link to="/admin">戻る</Link>
          </Button>
          {quizList.length === 0 ? (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              width={'100%'}
              height={'100vh'}
              fontSize={'40px'}
            >
              何も登録されていません。
            </Grid>
          ) : (
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{
                backgroundColor: '#eaffce',
              }}
            >
              <Box width={'90%'} maxWidth={'700px'} my={5}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <Typography variant="h4">問題一覧</Typography>
                  <Button
                    variant="contained"
                    size="medium"
                    disabled={quizList.length === MAX_QUIZ_COUNT}
                    onClick={() => {
                      navigateCreateQuiz();
                    }}
                  >
                    問題作成
                  </Button>
                </Grid>
                {quizList.map((quiz, index) => (
                  <Grid
                    key={quiz.id}
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                    marginTop={2}
                  >
                    <Grid item xs={10}>
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{
                          backgroundColor: '#ccf5ff',
                          borderRadius: 10,
                          border: 2,
                          padding: 1,
                        }}
                        onClick={() => navigateEditQuiz(quiz.id)}
                      >
                        <Box>No{quiz.no}.</Box>
                        <Box sx={{ paddingLeft: 1 }}>{quiz.content}</Box>
                      </Stack>
                    </Grid>
                  </Grid>
                ))}
                <Grid container justifyContent="flex-end" mt={5}>
                  <Button
                    variant="contained"
                    size="medium"
                    color="warning"
                    onClick={() => {
                      deleteQuiz(lastQuizNo);
                    }}
                  >
                    削除
                  </Button>
                </Grid>
              </Box>
            </Grid>
          )}
        </>
      )}
    </>
  );
};

export default QuizList;
