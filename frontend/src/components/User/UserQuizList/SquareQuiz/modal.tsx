import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Quiz } from '../../../../types';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRecoilValue } from 'recoil';
import { userInfoSelector } from '../../../../store';

type Props = {
  quiz: Quiz;
  isOpen: boolean;
  closeChoiceModal: () => void;
};

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          '&:hover': {
            backgroundColor: '#ffff00',
          },
        },
      },
    },
  },
});

const ModalSquareQuiz = ({ quiz, isOpen, closeChoiceModal }: Props) => {
  const user = useRecoilValue(userInfoSelector);
  const [selectAncer, setSelectAncer] = useState<'A' | 'B' | 'C' | null>();

  const selectA = () => {
    setSelectAncer('A');
  };
  const selectB = () => {
    setSelectAncer('B');
  };
  const selectC = () => {
    setSelectAncer('C');
  };

  const onSelectAnswer = async () => {
    const key = `question_${quiz.id}_select_mark`;
    const data = {
      guest_id: user.id,
      [key]: selectAncer,
    };
    // const key = `question_${quiz.id}_select_mark`;
    // data[key] = selectAncer;

    const res = await fetch(
      `http://localhost:3000/guest_select_answer/${user.id}`,
      {
        method: 'PUT',
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    console.log(res);
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal open={isOpen} onClose={closeChoiceModal}>
        <Stack
          justifyContent="center"
          alignItems="center"
          width={'330px'}
          height={'470px'}
          sx={{
            position: 'relative',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: 24,
            bgcolor: 'black',
            backgroundImage: 'url("/images/choice_ancer_card.png")',
            backgroundSize: 'cover',
          }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex_start"
            spacing={1}
            sx={{ position: 'absolute', top: '20px' }}
          >
            <Typography
              variant="h4"
              sx={{ color: '#ffeb3b', fontWeight: 'bold' }}
            >
              {quiz.id}.
            </Typography>
            <TextField
              variant="standard"
              multiline
              maxRows={2}
              value={quiz.question_title}
              InputProps={{
                style: {
                  fontSize: '20px',
                  lineHeight: '36px',
                  width: '230px',
                  color: 'white',
                },
              }}
            />
          </Stack>

          <Stack
            justifyContent="flex_start"
            alignItems="center"
            spacing={4}
            sx={{
              position: 'absolute',
              top: '120px',
              width: '220px',
            }}
          >
            <Button
              onClick={() => selectA()}
              sx={{
                color: '#0005da',
                backgroundColor: selectAncer === 'A' ? '#ffff00' : '#ffffff',
                width: '100%',
              }}
            >
              <Stack
                justifyContent="flex-start"
                direction="row"
                sx={{ width: '100%' }}
              >
                <Box sx={{ mr: '10px' }}>A.</Box>
                {quiz.option_a}
              </Stack>
            </Button>
            <Button
              onClick={() => selectB()}
              sx={{
                color: '#0005da',
                backgroundColor: selectAncer === 'B' ? '#ffff00' : '#ffffff',
                width: '100%',
              }}
            >
              <Stack
                justifyContent="flex-start"
                direction="row"
                sx={{ width: '100%' }}
              >
                <Box sx={{ mr: '10px' }}>B.</Box>
                {quiz.option_b}
              </Stack>
            </Button>
            <Button
              onClick={() => selectC()}
              sx={{
                color: '#0005da',
                backgroundColor: selectAncer === 'C' ? '#ffff00' : '#ffffff',
                width: '100%',
              }}
            >
              <Stack
                justifyContent="flex-start"
                direction="row"
                sx={{ width: '100%' }}
              >
                <Box sx={{ mr: '10px' }}>C.</Box>
                {quiz.option_c}
              </Stack>
            </Button>
          </Stack>

          <Button
            sx={{
              position: 'absolute',
              top: '380px',
              width: '220px',
              backgroundColor:
                selectAncer !== 'A' &&
                selectAncer !== 'B' &&
                selectAncer !== 'C'
                  ? 'gray'
                  : '#00ffe7',
            }}
            disabled={
              selectAncer !== 'A' && selectAncer !== 'B' && selectAncer !== 'C'
            }
            onClick={onSelectAnswer}
          >
            決定
          </Button>
        </Stack>
      </Modal>
    </ThemeProvider>
  );
};

export default ModalSquareQuiz;
