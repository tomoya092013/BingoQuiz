import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

type Mark = 'A' | 'B' | 'C' | 'D' | 'E';

type Question = {
  title: string;
  correct_mark: string | null;
  is_ancer_opened: boolean;
};

type Choice = {
  question_id: number;
  mark: Mark;
  content: string;
};

const CreateQuestion = () => {
  const MARK:Mark[] = ['A', 'B', 'C', 'D', 'E'];
  const [quizTitle, setQuizTitle] = useState<string>('')
  const [choice, setchoice] = useState<string>('');
  const [choiceList, setChoiceList] = useState<string[]>([]);
  const LAST_CHOICE_ID = choiceList.length - 1;

  //Mark型だとエラーが出る
  const [selectRadio, setSelectRadio] = useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    setQuizTitle(e.target.value)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (choice.length === 13) return;
    setchoice(e.target.value);
  };

  const addChoice = () => {
    setChoiceList([...choiceList, choice]);
    setchoice('');
  };
  const handleChangeRadioButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectRadio(e.target.value);
  };
  const deleteChoice = () => {
    choiceList.length===1 && setSelectRadio(null)
    setChoiceList(
      choiceList.filter((_choice, index) => index !== LAST_CHOICE_ID)
    );
  };


  const createQuestion = async() => {
    const newChoiceList: Choice[]= []
    const requestQuestion= {
      questions: {
        title: quizTitle,
        correct_mark: selectRadio,
        is_ancer_opened: false
      }
    };
    const questionRes = await fetch('http://localhost:3001/questions', {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestQuestion)
    })
    const resultQuestion = await questionRes.json()
    const questionId = resultQuestion.id
    // console.log(data)

    // eslint-disable-next-line array-callback-return
    choiceList.map((choice,id)=>{
      const newChoice:Choice = {
        question_id: questionId,
        mark: MARK[id],
        content: choice
      }
      newChoiceList.push(newChoice)
    })
    
    const requestChoice = {
      choice: {newChoiceList}
    }
    const choiceRes = await fetch(`http://localhost:3001/questions/${questionId}/choices`, {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestChoice)
    })
    const resultChoice = await choiceRes.json();
    console.log(resultChoice);
  }

  return (
    <Stack direction="column" justifyContent="center"alignItems="center"spacing={3}width="100%"height="100vh">
      <Card raised sx={{width: '80%',height: '80vh',maxWidth: 450,maxHeight: 650,p: 2,}}>
        <CardHeader title="問題作成" pb="0px" />
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <Stack direction="column" spacing={2}>
              <TextField label="クイズタイトル"variant="outlined" fullWidth multiline maxRows={2}
                onChange={(e) => handleTitleChange(e)} value={quizTitle}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="baseline"  justifyContent="center" px="10px" pb="5px">
              <TextField label="選択肢" variant="standard"  fullWidth value={choice}
                inputProps={{
                  maxLength: 13,
                }}
                onChange={(e) => handleChange(e)}
              />
              <Button
                variant="outlined" size="small"
                onClick={() => addChoice()}
                disabled={
                  (choiceList.length >= 5 && true) ||
                  choice.length === 0
                }
                sx={{ marginLeft: '10px' }}
              >
                追加
              </Button>
            </Stack>
          </Grid>
          <Grid container ml="20px" mt="10px" spacing={1}>
            <Typography color="text.secondary" variant="caption" ml="10px">
              選択したものが答えになります
            </Typography>
            {choiceList.map((_choice, id) => (
              <Grid item xs={12} key={id}>
                <Stack direction="row" alignItems="center">
                  <Radio
                    value={MARK[id]}
                    checked={selectRadio === MARK[id]}
                    onChange={(e) => handleChangeRadioButton(e)}
                  />
                  <Box>{MARK[id]}.</Box>
                  <Box ml="5px">{choiceList[id]}</Box>
                </Stack>
              </Grid>
            ))}
          </Grid>

          <CardActions>
            <Stack direction="row" alignItems="center" spacing={3} mt="10px">
              <Button variant="contained" size="medium" sx={{ width: '110px' }} 
              disabled={choiceList.length < 2 || selectRadio === null}  
              onClick={()=>createQuestion()}>
                問題登録
              </Button>
              <Button variant="contained" size="medium" color="warning" sx={{ width: '110px' }}
                disabled={choiceList.length === 0}
                onClick={() => deleteChoice()}>
                削除
              </Button>
            </Stack>
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


