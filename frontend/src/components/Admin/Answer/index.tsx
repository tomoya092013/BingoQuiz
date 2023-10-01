import { SetStateAction, useEffect, useState } from 'react';

import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
// import { Link } from 'react-router-dom';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

import { onClickGetPoke } from '../../../hooks/getPoke';
import { Quiz } from '../../../types';
import ClearOpenedAnswerDialog from '../Dialog';
import Katakuri from '../Katakuri';
import AnswerModal from './modal';

type Props = {
  navigateTop: () => void;
  katakuriText: string;
  handleInputChange: (e: { target: { value: SetStateAction<string> } }) => void;
  openKatakuri: () => void;
};

const Answers = ({
  navigateTop,
  katakuriText,
  handleInputChange,
  openKatakuri,
}: Props) => {
  // const location = useLocation();
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  const [isModal, setIsModal] = useState(false);
  const [pokeName, setPokeName] = useState<string>('');
  const [pokeImage, setPokeImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [correctMark, setCorrectMark] = useState<string>('');
  const [quizId, setQuizId] = useState<number>(0);

  const getQuizList = async () => {
    const res = await fetch('http://localhost:3000/quizzes');
    const json: Quiz[] = await res.json();
    setQuizList(json);
    setIsLoading(false);
  };

  useEffect(() => {
    getQuizList();
  }, [isModal]);

  const goToModal = async (id: number, correct_mark: string) => {
    setQuizId(id);
    setCorrectMark(correct_mark);
    setIsModal(true);
    const result = await onClickGetPoke();
    setPokeName(result.pokeName);
    setPokeImage(result.pokeImage);
  };

  return (
    <Box
      width="100%"
      height="100vh"
      sx={{
        backgroundImage: 'url("/images/monster_ball_stage.jpeg")',
        backgroundSize: 'cover',
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        paddingTop="20px"
      >
        <img src="/images/doctor.png" alt="doctor" width={250} height={250} />
        <Box
          sx={{
            height: '200px',
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fffbda',
            border: 'dashed 6px',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            ここに9ひきのポケモンがおるじゃろ？
            <br />
            好きなのを1匹選ぶんじゃ。
            <br />
            <br />
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Button
                onClick={() => navigateTop()}
                variant="outlined"
                size="large"
                sx={{ fontWeight: 'bold' }}
              >
                問題一覧
                <DirectionsBikeIcon sx={{ marginLeft: '8px' }} />
              </Button>
            </Stack>
          </Typography>
        </Box>
      </Stack>
      <Box margin="auto" width="70%">
        <Grid
          container
          spacing={5}
          direction="row"
          justifyContent="center"
          alignItems="center"
          height="60vh"
          padding="20px"
        >
          {isLoading ? (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              fontSize={'40px'}
              color={'white'}
            >
              Loading...
            </Stack>
          ) : (
            <>
              {quizList.map((quiz) => (
                <Grid item xs={6} md={3} key={quiz.id}>
                  <Stack direction="row" alignItems="flex-start">
                    <Typography
                      variant="h3"
                      marginRight="10px"
                      color={'#ff9800'}
                    >
                      {quiz.id}.
                    </Typography>
                    {quiz.is_answer_opened ? (
                      <Typography
                        variant="h1"
                        sx={{ color: '#ffe500', fontWeight: 'bold' }}
                      >
                        {quiz.correct_mark}
                      </Typography>
                    ) : (
                      <Button
                        onDoubleClick={() =>
                          goToModal(quiz.id, quiz.correct_mark)
                        }
                        sx={{
                          transition: 'transform 0.5s',
                          '&:hover': {
                            transform: 'scale(1.5)',
                          },
                        }}
                      >
                        <img
                          src="/images/monster_ball.png"
                          alt="monster_ball"
                          width={60}
                          height={60}
                        />
                      </Button>
                    )}
                  </Stack>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Box>
      <AnswerModal
        isModal={isModal}
        setIsModal={setIsModal}
        pokeImage={pokeImage}
        pokeName={pokeName}
        correctMark={correctMark}
        quizId={quizId}
      />
      <ClearOpenedAnswerDialog getQuizList={getQuizList} />
      <Stack alignItems="flex-end">
        <Katakuri
          katakuriText={katakuriText}
          handleInputChange={handleInputChange}
          openKatakuri={openKatakuri}
        />
      </Stack>
    </Box>
  );
};

export default Answers;
