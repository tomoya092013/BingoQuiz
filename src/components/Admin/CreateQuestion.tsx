import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
    Box, Button, Card, CardActions, CardHeader, Grid, Radio, Stack, TextField, Typography
} from '@mui/material';

type Mark = 'A' | 'B' | 'C' | 'D' | 'E';

type Question = {
  id: number;
  question_title: string;
  correct_ancer: Mark;
};

type QuestionChoice = {
  question_id: number;
  mark: Mark;
  choice_title: string;
  is_ancer_opened: boolean;
};

const CreateQuestion = () => {
  const MARK = ['A', 'B', 'C', 'D', 'E'];
  const [quizChoice, setQuizChoice] = useState<string>('');
  const [quizeChoiceList, setQuizeChoiceList] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (quizChoice.length === 13) return;
    setQuizChoice(e.target.value);
  };
  const addChoice = () => {
    setQuizeChoiceList([...quizeChoiceList, quizChoice]);
    setQuizChoice('');
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      width="100%"
      height="100vh"
    >
      <Card
        raised
        sx={{
          width: '80%',
          height: '80vh',
          maxWidth: 450,
          maxHeight: 650,
          p: 2,
        }}
      >
        <CardHeader title="問題作成" />
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <Stack direction="column" spacing={2} mt={'15px'}>
              {/* <Box>タイトル：</Box> */}
              <TextField
                label="クイズタイトル"
                variant="outlined"
                fullWidth
                multiline
                maxRows={4}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="row"
              alignItems="baseline"
              justifyContent="center"
              p="10px"
            >
              <TextField
                label="選択肢"
                variant="standard"
                fullWidth
                value={quizChoice}
                onChange={(e) => handleChange(e)}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={() => addChoice()}
                disabled={quizeChoiceList.length >= 5 && true}
                sx={{ marginLeft: '10px' }}
              >
                追加
              </Button>
            </Stack>
          </Grid>
          <Grid container ml="20px" spacing={1}>
            {quizeChoiceList.map((choice, id) => (
              <Grid item xs={12} key={id}>
                <Stack direction="row" alignItems="center">
                  <Radio />
                  <Box>{MARK[id]}.</Box>
                  <Box ml="5px">{quizeChoiceList[id]}</Box>
                </Stack>
              </Grid>
            ))}
          </Grid>

          <CardActions>
            <Button variant="contained" size="large" sx={{ margin: '15px' }}>
              問題登録
            </Button>
          </CardActions>
        </Grid>
      </Card>
      <Box>
        <Link to="/admin">戻る</Link>
      </Box>
    </Stack>
  );
};

export default CreateQuestion;
