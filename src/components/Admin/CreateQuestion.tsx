import React from 'react';
import { Link } from 'react-router-dom';

import { Box } from '@mui/material';

const CreateQuestion = () => {
  return (
    <>
      <Box>問題作成</Box>
      <Link to="/admin">戻る</Link>
    </>
  );
};

export default CreateQuestion;
