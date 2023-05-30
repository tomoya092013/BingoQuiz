import React from 'react';
import { Link } from 'react-router-dom';

import { Box } from '@mui/material';

const QuestionList = () => {
  return (
    <>
      <Box>問題一覧</Box>
      <Link to="/admin">戻る</Link>
    </>
  );
};

export default QuestionList;
