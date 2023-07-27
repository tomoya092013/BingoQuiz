import React, { useEffect, useState } from 'react';
import { Quiz } from '../../../types';
import { Link, useLocation } from 'react-router-dom';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import AnswerModal from './modal';
import { onClickGetPoke } from '../../../hooks/getPoke';

const Answers = () => {
  const location = useLocation();
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  const [isModal, setIsModal] = useState(false);
  const [pokeName, setPokeName] = useState<string>('');
  const [pokeImage, setPokeImage] = useState<string>('');

  useEffect(() => {
    setQuizList(location.state.quiz);
  }, [location.state.quiz]);

  const goToMOdal = async () => {
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
              <Link to="/">問題一覧</Link>
              <DirectionsBikeIcon sx={{ marginLeft: '8px' }} />
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
          {quizList.map((quiz) => (
            <Grid item xs={6} md={3} key={quiz.id}>
              <Stack direction="row" alignItems="flex-start">
                <Typography variant="h3" marginRight="10px" color={'#ff9800'}>
                  {quiz.id}.
                </Typography>
                <Button
                  onDoubleClick={() => goToMOdal()}
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
                <AnswerModal
                  isModal={isModal}
                  setIsModal={setIsModal}
                  pokeImage={pokeImage}
                  pokeName={pokeName}
                  correctMark={quiz.correct_mark}
                />
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Answers;
