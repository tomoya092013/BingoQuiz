import React, { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const shakeAnimation = keyframes`
  0% {
    transform: rotate(-50deg);
  }
  10% {
    transform: rotate(40deg);
  }
  20% {
    transform: rotate(-30deg);
  }
  40% {
    transform: rotate(50deg);
  }
  45% {
    transform: rotate(-40deg);
  }
  50% {
    transform: rotate(50deg);
  }
  55% {
    transform: rotate(-50deg);
  }
  60% {
    transform: rotate(80deg);
  }
  70% {
    transform: rotate(-80deg);
  }
  75% {
    transform: rotate(100deg);
  }
  80% {
    transform: rotate(-120deg);
  }
  90% {
    transform: rotate(140deg);
  }
  95% {
    transform: rotate(-2700deg);
  }
  100% {
    transform: rotate(3000deg);
  }
`;

const ShakeButton = styled(Button)`
  animation: ${shakeAnimation} 5s ease-in-out;
`;

const style = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  bgcolor: 'rgba(100, 100, 100, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

type Props = {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  pokeImage: string;
  pokeName: string;
  correctMark?: string;
  quizId: number;
};

const AnswerModal = ({
  isModal,
  setIsModal,
  pokeImage,
  pokeName,
  correctMark,
  quizId,
}: Props) => {
  const [isMove, setIsMove] = useState(false);
  const [isAppearPokemon, setIsAppearPokemon] = useState(false);
  const [isAppearCorrectMark, setIsAppearCorrectMark] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const updateQuiz = async (id: number) => {
    try {
      const data = { is_answer_opened: true };
      const res = await fetch(`http://localhost:3000/quizzes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const appearPokemon = async () => {
    setIsDisabled(true);
    setIsMove(true);
    const timer = setTimeout(async () => {
      await updateQuiz(quizId);
      setIsAppearPokemon(true);
    }, 5000);
    return () => clearTimeout(timer);
  };

  const resetState = () => {
    setIsMove(false);
    setIsAppearPokemon(false);
    setIsAppearCorrectMark(false);
    setIsDisabled(false);
  };

  const buckToMosterBallList = () => {
    resetState();
    setIsModal(false);
  };

  if (isModal) {
    return (
      <Box sx={style}>
        {!pokeImage ? (
          <Box>Loading...</Box>
        ) : (
          <Box
            width="50%"
            height="75%"
            sx={{
              backgroundImage: 'url("/images/summon_effect.jpeg")',
              backgroundSize: 'cover',
              borderRadius: '50px',
              position: 'relative',
            }}
          >
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ padding: '100px' }}
            >
              {!isMove ? (
                <Button onClick={() => appearPokemon()}>
                  <img
                    src="/images/monster_ball.png"
                    alt="monster_ball"
                    width={60}
                    height={60}
                  />
                </Button>
              ) : !isAppearPokemon ? (
                <ShakeButton disabled={isDisabled}>
                  <img
                    src="/images/monster_ball.png"
                    alt="monster_ball"
                    width={60}
                    height={60}
                  />
                </ShakeButton>
              ) : (
                <>
                  {!isAppearCorrectMark ? (
                    <>
                      <Typography
                        variant="h2"
                        sx={{ color: 'white', fontWeight: 'bold' }}
                      >
                        {pokeName}
                      </Typography>
                      <img
                        src={`${pokeImage}`}
                        alt="pokemon"
                        width={'50%'}
                        height={'50%'}
                        onClick={() => setIsAppearCorrectMark(true)}
                      />
                    </>
                  ) : (
                    <Typography
                      variant="h1"
                      sx={{ color: '#ffe500', fontWeight: 'bold' }}
                      onClick={() => setIsAppearCorrectMark(false)}
                    >
                      {correctMark}
                    </Typography>
                  )}
                </>
              )}
            </Stack>
            <Button
              variant="contained"
              size="small"
              sx={{
                position: 'absolute',
                bottom: '5%',
                left: '5%',
              }}
              onClick={() => buckToMosterBallList()}
            >
              とじる
            </Button>
          </Box>
        )}
      </Box>
    );
  } else {
    return null;
  }
};

export default AnswerModal;
