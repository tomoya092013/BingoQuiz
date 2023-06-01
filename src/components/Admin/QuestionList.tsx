import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Box } from '@mui/material';

type Question = {
  id: number;
  title: string;
  created_at: Date;
  updated_at: Date;
};

const QuestionList = () => {
  const getQuestionList = async () => {
    const res = await fetch('http://localhost:3001/question');
    const json: Question[] = await res.json();
    console.log(json);
    setQuestionList(json);
  };

  const [questionList, setQuestionList] = useState<Question[]>([]);

  useEffect(() => {
    getQuestionList();
  }, []);

  return (
    <>
      <Box>問題一覧</Box>
      <Link to="/admin">戻る</Link>
      {questionList.length === 0 ? (
        <Box>Loading。。。</Box>
      ) : (
        questionList.map((question, index) => (
          <Box key={index}>{question.title}</Box>
        ))
      )}
    </>
  );
};

export default QuestionList;
