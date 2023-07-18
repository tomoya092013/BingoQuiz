import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Quiz } from '../../../types';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Grid,
  Radio,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const EditQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [editQuiz, setEditQuiz] = useState<Quiz | null>(null);
  const [questionTitle, setQuestionTitle] = useState('');
  const [selectRadio, setSelectRadio] = useState<string | null>('A');
  const [option_A, setOption_A] = useState('');
  const [option_B, setOption_B] = useState('');
  const [option_C, setOption_C] = useState('');

  const handleChangeRadioButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectRadio(e.target.value);
  };
  const handleChangeTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {};
  const handleChangeOptionA = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOption_A(e.target.value);
  };
  const handleChangeOptionB = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOption_B(e.target.value);
  };
  const handleChangeOptionC = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOption_C(e.target.value);
  };

  const updateQuiz = async (id: number) => {
    const data = {
      question_title: questionTitle,
      option_a: option_A,
      option_b: option_B,
      option_c: option_C,
      correct_mark: selectRadio,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await fetch(`http://localhost:3001/quizzes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    navigate('/');
  };

  useEffect(() => {
    setEditQuiz(location.state.quiz);
    setQuestionTitle(location.state.quiz.question_title);
    setSelectRadio(location.state.quiz.correct_mark);
    setOption_A(location.state.quiz.option_a);
    setOption_B(location.state.quiz.option_b);
    setOption_C(location.state.quiz.option_c);
  }, []);

  return (
    <>
      {editQuiz !== null && (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          width="100%"
          minHeight="100vh"
          sx={{ backgroundColor: '#eaffce' }}
        >
          <Card
            raised
            sx={{
              width: '70%',
              minHeight: '50vh',
              maxWidth: '600px',
              p: 2,
            }}
          >
            <Stack direction="row" justifyContent="center" alignItems="center">
              <CardHeader title="問題編集" pb="0px" />
              <Button>
                <Link to="/">戻る</Link>
              </Button>
            </Stack>

            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12}>
                <Stack direction="column" spacing={2}>
                  <TextField
                    label="クイズタイトル"
                    variant="outlined"
                    fullWidth
                    multiline
                    maxRows={2}
                    value={questionTitle}
                    onChange={(e) => handleChangeTitle(e)}
                  />
                </Stack>
              </Grid>
              <Grid container ml="20px" mt="10px" spacing={1}>
                <Grid item xs={12}>
                  <Typography
                    color="text.secondary"
                    variant="caption"
                    ml="10px"
                  >
                    選択したものが答えになります
                  </Typography>
                </Grid>
                <Stack
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  spacing={3}
                  width="100%"
                >
                  <Stack direction="row" alignItems="center" width="100%">
                    <Radio
                      value="A"
                      checked={selectRadio === 'A'}
                      onChange={(e) => handleChangeRadioButton(e)}
                    />
                    <Box>A.</Box>
                    <TextField
                      sx={{ ml: '5px', p: '10px' }}
                      id="standard-basic"
                      fullWidth
                      variant="standard"
                      value={option_A}
                      onChange={(e) => handleChangeOptionA(e)}
                    />
                  </Stack>
                  <Stack direction="row" alignItems="center" width="100%">
                    <Radio
                      value="B"
                      checked={selectRadio === 'B'}
                      onChange={(e) => handleChangeRadioButton(e)}
                    />
                    <Box>B.</Box>
                    <TextField
                      sx={{ ml: '5px', p: '10px' }}
                      id="standard-basic"
                      variant="standard"
                      fullWidth
                      value={option_B}
                      onChange={(e) => {
                        handleChangeOptionB(e);
                      }}
                    />
                  </Stack>
                  <Stack direction="row" alignItems="center" width="100%">
                    <Radio
                      value="C"
                      checked={selectRadio === 'C'}
                      onChange={(e) => handleChangeRadioButton(e)}
                    />
                    <Box>C.</Box>
                    <TextField
                      sx={{ ml: '5px', p: '10px' }}
                      id="standard-basic"
                      variant="standard"
                      fullWidth
                      value={option_C}
                      onChange={(e) => {
                        handleChangeOptionC(e);
                      }}
                    />
                  </Stack>
                </Stack>
              </Grid>

              <CardActions>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={3}
                  mt="10px"
                >
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{ width: '110px' }}
                    onClick={() => updateQuiz(editQuiz.id)}
                  >
                    編集完了
                  </Button>
                </Stack>
              </CardActions>
            </Grid>
          </Card>
        </Stack>
      )}
    </>
  );
};

export default EditQuiz;
