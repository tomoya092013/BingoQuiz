import React from 'react';
import { Link } from 'react-router-dom';

import { List, ListItem } from '@mui/material';

const Admin = () => {
  return (
    <>
      <List>
        <ListItem>
          <Link to="/admin/createQuiz">問題作成</Link>
        </ListItem>
        <ListItem>
          <Link to="/admin/quizList">問題一覧</Link>
        </ListItem>
      </List>
    </>
  );
};

export default Admin;
