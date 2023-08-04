import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

const ClearOpenedAnswerDialog = ({
  getQuizList,
}: {
  getQuizList: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clearAllOpenedAnswer = async () => {
    await fetch('http://localhost:3000/quizzes/clear_all_opened_answer', {
      method: 'POST',
    });
    getQuizList();
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => handleClickOpen()}
        sx={{ ml: '30px' }}
      >
        解答をクリアする
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => handleClose()}>消さない</Button>
          <Button onClick={() => clearAllOpenedAnswer()}>消す</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ClearOpenedAnswerDialog;
