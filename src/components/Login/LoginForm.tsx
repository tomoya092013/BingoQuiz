import React from 'react';
import { Link } from 'react-router-dom';

import { List, ListItem } from '@mui/material';

const LoginForm = () => {
  return (
    <>
      <List>
        <ListItem>
          <Link to="/admin">あどみん</Link>
        </ListItem>
        <ListItem>
          <Link to="/guest/bingoSheet">ゲストビンゴシート</Link>
        </ListItem>
      </List>
    </>
  );
};

export default LoginForm;
