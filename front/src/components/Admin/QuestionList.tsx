import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, Button,  Grid, Stack, Typography } from '@mui/material';

type Question = {
  id: number;
  title: string;
  correct_mark: string
  is_ancer_opened: boolean
  created_at: Date;
  updated_at: Date;
};

const QuestionList = () => {
  // 選択肢も必要だった
  const getQuestionList = async () => {
    const res = await fetch('http://localhost:3001/questions');
    const json: Question[] = await res.json();
    setQuestionList(json);
  };

  const [questionList, setQuestionList] = useState<Question[]>([]);

  useEffect(() => {
    getQuestionList();
  }, []);

  return (
    <>
      {questionList.length === 0 ? (
        <Stack direction="row" justifyContent="center" alignItems="center" width={"100%"} height={"100vh"} fontSize={"40px"}>Loading...
        </Stack>
      ) : (
        
        <Stack direction="column" justifyContent="flex-start" spacing={50} sx={{ width: '80%', height: '100vh',margin: '100px auto', maxWidth:600, padding:'50px', backgroundColor:'#eaffce'}}>
          
          <Grid container spacing={3}>
          <Grid item xs={12}><Typography variant="h2" gutterBottom>問題一覧</Typography></Grid>
            {questionList.map((question, index) => (
              <Grid item xs={12} key={question.id}>
                <Stack  direction="row" justifyContent="flex-start"     alignItems="center" sx={{backgroundColor: '#ccf5ff', borderRadius:10, border: 2, padding: 2}}>
                  <Box>No{question.id}.</Box>
                  <Box sx={{paddingLeft: 1}}>{question.title}</Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Stack>
      )}
      <Button><Link to="/admin">戻る</Link></Button>
    </>
  );
};

export default QuestionList;
