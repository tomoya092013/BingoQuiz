import { SetStateAction, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  Stack,
  styled,
  Typography,
} from '@mui/material';

import { Quiz } from '../../../types';
import Answers from '../Answer';
import Katakuri from '../Katakuri';

const AnswerButton = styled(Button)({
  width: '150px',
  height: '40px',
  backgroundColor: '#ff55ac',
  color: 'white',
  boxShadow: '15px 15px 4px 1px #777777',
  transition: '0.7s',
  '&:hover': {
    backgroundColor: '#ff0000',
    boxShadow: '2px 2px 1px 1px #777777',
    transform: 'translateY(5px)',
  },
});

const CustomBox = styled(Box)({
  backgroundColor: '#ccf5ff',
  boxShadow: '15px 15px 8px 5px #777777',
  borderRadius: '40px',
  border: '2px solid',
  padding: '8px',
  transition: '0.7s',
  '&:hover': {
    backgroundColor: '#b9ffc0',
    boxShadow: '2px 2px 2px 2px #777777',
    transform: 'translateY(3px)',
  },
});

const QuizList = () => {
  const navigate = useNavigate();
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const refTop = useRef<HTMLDivElement | null>(null);
  const refAnswer = useRef<HTMLDivElement | null>(null);
  const [isKatakuri, setIsKatakuri] = useState<boolean>(false);
  const [katakuriText, setKatakuriText] = useState('');
  const [katakuriList, setKatakuriList] = useState<string[]>([]);

  const KatakuriStack = styled(Stack)({
    justifyContent: 'center',
    alignItems: 'center',
    height: '110px',
    width: '100px',
    position: 'absolute',
    top: '20px',
  });

  const KatakuriText = styled(Typography)({
    fontSize: '24px',
    writingMode: 'vertical-rl',
    letterSpacing: '2px',
    fontWeight: 'bold',
  });

  const getQuizList = async () => {
    const res = await fetch('http://localhost:3000/quizzes');
    const json: Quiz[] = await res.json();
    setQuizList(json);
    setIsLoading(false);
  };

  const navigateEditQuiz = (id: number) => {
    navigate(`/admin/editQuiz/${id}`, { state: { quiz: quizList[id - 1] } });
  };

  const navigateAnswers = () => {
    // navigate('/admin/answers', { state: { quiz: quizList } });
    refAnswer?.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const navigateTop = () => {
    refTop?.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const openKatakuri = () => {
    setKatakuriList(katakuriText.split(/\s/));
    setIsKatakuri(true);
  };

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setKatakuriText(e.target.value);
  };

  const closeKatakuri = () => {
    setKatakuriText('');
    setIsKatakuri(false);
  };

  useEffect(() => {
    getQuizList();
  }, []);

  return (
    <>
      {isLoading === true ? (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          width={'100%'}
          height={'100vh'}
          fontSize={'40px'}
        >
          Loading...
        </Stack>
      ) : (
        <>
          <Grid
            container
            direction="row"
            justifyContent="center"
            minHeight={'100vh'}
            ref={refTop}
            sx={{
              backgroundColor: '#eaffce',
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              sx={{ mt: 5 }}
            >
              <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                問題一覧
              </Typography>
              <AnswerButton onClick={() => navigateAnswers()}>
                解答ページ
                <DirectionsRunIcon sx={{ marginLeft: '8px' }} />
              </AnswerButton>
            </Grid>
            <Box sx={{ px: 10 }}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={3}
                marginTop={2}
              >
                {quizList.map((quiz) => (
                  <Grid key={quiz.id} item xs={12} md={4}>
                    <CustomBox
                      onClick={() => navigateEditQuiz(quiz.id)}
                      sx={{ paddingLeft: 2 }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                      >
                        <Typography variant="h5">{quiz.id}.</Typography>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ paddingLeft: 1 }}
                        >
                          {quiz.question_title}
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle1" sx={{ paddingLeft: 2 }}>
                        A. {quiz.option_a}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ paddingLeft: 2 }}>
                        B. {quiz.option_b}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ paddingLeft: 2 }}>
                        C. {quiz.option_c}
                      </Typography>
                    </CustomBox>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Stack width="100%" alignItems="flex-end">
              <Katakuri
                katakuriText={katakuriText}
                handleInputChange={handleInputChange}
                openKatakuri={openKatakuri}
              />
            </Stack>
          </Grid>
          <div ref={refAnswer}>
            <Answers
              navigateTop={navigateTop}
              katakuriText={katakuriText}
              handleInputChange={handleInputChange}
              openKatakuri={openKatakuri}
            />
          </div>
          <Dialog open={isKatakuri} onClose={closeKatakuri}>
            <DialogContent>
              <Box padding="10px" sx={{ position: 'relative' }}>
                <img src="/images/katakuri.png" width="350px" />
                <KatakuriStack sx={{ left: '200px' }}>
                  <KatakuriText>{katakuriList[0]}</KatakuriText>
                </KatakuriStack>
                <KatakuriStack sx={{ left: '30px' }}>
                  <KatakuriText>{katakuriList[1]}</KatakuriText>
                </KatakuriStack>
              </Box>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
};

export default QuizList;
